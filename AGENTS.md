# Architecture rules

- Keep gallery thumbnails in separate asset pointers from immutable original photos; grid images use thumbnails and the lightbox uses originals with zero adjacent-slide preload, so browsing the gallery does not download full-resolution photos.
- Render office seasonal hours in a dedicated component with a null initial highlight and a client-side Europe/Warsaw month calculation, so both schedules remain available without build-time season selection.
- Keep the service-area map offline and isolated from other sections; project all geographic coordinates with one latitude-aware transform and use separate sourced border/river geometries, so label layout never distorts geography or requires runtime map services.