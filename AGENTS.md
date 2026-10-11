# Architecture rules

- Keep gallery thumbnails in separate asset pointers from immutable original photos; grid images use thumbnails and the lightbox uses originals with zero adjacent-slide preload, so browsing the gallery does not download full-resolution photos.