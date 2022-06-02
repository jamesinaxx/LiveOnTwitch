use std::path::Path;

use dunce::canonicalize;
use image::{imageops::FilterType, ImageFormat};
use rayon::prelude::*;

const SIZES: [u32; 6] = [16, 32, 48, 64, 96, 128];
const ICON_BYTES: &[u8] = include_bytes!("icon.png");
const MANIFEST_DIR: &str = env!("CARGO_MANIFEST_DIR");

fn main() -> anyhow::Result<()> {
    let img = image::load_from_memory(ICON_BYTES)?;
    let dest_path = Path::new(MANIFEST_DIR).join("../../src/assets");
    let dest_path_canonical = canonicalize(dest_path)?.join("icons");

    std::fs::create_dir_all(&dest_path_canonical)?;

    SIZES.into_par_iter().for_each(|size| {
        let img = img.clone();
        let resized = img.resize(size, size, FilterType::Nearest);

        let image_name = format!("{}.png", size);
        let image_path = dest_path_canonical.join(image_name);
        let res = resized.save_with_format(image_path, ImageFormat::Png);

        if let Err(err) = res {
            eprintln!("Error resizing icon {}: {}", size, err);
        }
    });

    Ok(())
}
