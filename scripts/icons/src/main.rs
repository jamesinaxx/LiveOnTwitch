use image::{imageops::FilterType, ImageFormat};
use rayon::prelude::*;

const SIZES: [u32; 6] = [16, 32, 48, 64, 96, 128];

fn main() -> anyhow::Result<()> {
    let img = image::open("./icon.png")?;
    let dest_path = std::env::current_dir()?.join("../../src/assets/icons");

    std::fs::create_dir_all(&dest_path)?;

    SIZES.into_par_iter().for_each(|size| {
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
