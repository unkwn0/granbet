# Architecture rules

- Keep gallery thumbnails in separate asset pointers from immutable original photos; grid images use thumbnails and the lightbox uses originals with zero adjacent-slide preload, so browsing the gallery does not download full-resolution photos.
- Keep the service-area map offline and isolated from other sections; project all geographic coordinates with one latitude-aware transform and use separate sourced border/river geometries, so label layout never distorts geography or requires runtime map services.