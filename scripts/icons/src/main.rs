const SIZES: [u8; 6] = [16, 32, 48, 64, 96, 128];

fn main() -> anyhow::Result<()> {
    let img = image::open("./icon.png")?;
    println!("Hello, world!");

    Ok(())
}
