use image::imageops::FilterType;

const SIZES: [u32; 6] = [16, 32, 48, 64, 96, 128];

fn main() -> anyhow::Result<()> {
    let img = image::open("./icon.png")?;

    for size in SIZES {
        let img = img.clone();
        img.resize(size, size, FilterType::Nearest);
    }

    Ok(())
}
