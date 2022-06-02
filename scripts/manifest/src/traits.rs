pub trait ExtAction {}

pub trait ExtManifest {
    type Action: ExtAction;

    fn action() -> Self::Action;
}
