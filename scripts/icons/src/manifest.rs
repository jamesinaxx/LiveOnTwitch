use std::collections::HashMap;

use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Manifest {
    author: String,
    manifest_version: i64,
    browser_action: BrowserAction,
    background: Background,
    icons: HashMap<String, String>,
    permissions: Vec<String>,
    content_scripts: Vec<ContentScript>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Background {
    scripts: Vec<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct BrowserAction {
    default_popup: String,
    default_title: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ContentScript {
    matches: Vec<String>,
    js: Vec<String>,
}
