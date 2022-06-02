use std::collections::HashMap;

use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Manifest {
    pub author: String,
    pub manifest_version: i64,
    pub browser_action: BrowserAction,
    pub background: Background,
    pub icons: HashMap<String, String>,
    pub permissions: Vec<String>,
    pub content_scripts: Vec<ContentScript>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Background {
    pub scripts: Vec<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct BrowserAction {
    pub default_popup: String,
    pub default_title: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ContentScript {
    pub matches: Vec<String>,
    pub js: Vec<String>,
}
