use std::path::{Path, PathBuf};

use dunce::canonicalize;
use image::{imageops::FilterType, ImageFormat};
use rayon::prelude::*;

mod manifest;

const ICON_BYTES: &[u8] = include_bytes!("icon.png");
const EXT_MANIFEST_STR: &str = include_str!("../../../src/assets/base_manifest.json");

fn get_canon_path() -> anyhow::Result<PathBuf> {
    let dest_path = Path::new(env!("CARGO_MANIFEST_DIR")).join("../../src/assets");
    let dest_path_canonical = canonicalize(dest_path)?.join("icons");

    Ok(dest_path_canonical)
}

fn parse_manifest() -> anyhow::Result<manifest::Manifest> {
    let ext_manifest: manifest::Manifest = serde_json::from_str(EXT_MANIFEST_STR)?;

    Ok(ext_manifest)
}

fn parse_size(path: &str) -> Result<u32, std::num::ParseIntError> {
    // Removes the icons/ from the path
    let file_name = &path[0..5];
    // Gets everything but the .png extension
    let size = &file_name[..(file_name.len() - 4)];

    size.parse::<u32>()
}

fn main() -> anyhow::Result<()> {
    let img = image::load_from_memory(ICON_BYTES)?;
    let manifest = parse_manifest()?;
    let sizes = manifest
        .icons
        .keys()
        .map(|x| parse_size(x))
        .collect::<Result<Vec<_>, _>>()?;

    let dest_path = get_canon_path()?;

    std::fs::create_dir_all(&dest_path)?;

    sizes.into_par_iter().for_each(|size| {
        let img = img.clone();
        let resized = img.resize(size, size, FilterType::Nearest);

        let image_name = format!("{}.png", size);
        let image_path = dest_path.join(image_name);
        let res = resized.save_with_format(image_path, ImageFormat::Png);

        if let Err(err) = res {
            eprintln!("Error resizing icon {}: {}", size, err);
        }
    });

    Ok(())
}
