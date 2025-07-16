# Changelog
This document contains the historical changes of the **@cotecna/stencil-components** npm public library.

## [3.3.1] - 2025-07-16
### Fixed
- Fix optional dependencies versions in package.json to pass the pipeline.

## [3.3.0] - 2025-07-16
### Added
- [OCR] Introduced the new ocrByDeeplinkConfig property. When set, the component will launch the specified app via deeplink to perform its own OCR and return the result back to the component.

## [3.2.1] - 2024-06-26
### Fixed
- Improved Email-box regex to prevent bad emails like multiple dot.

## [3.2.0] - 2024-05-31
### Changed
- Email-Box component now allows emails that contains capital letters.

## [3.1.0] - 2024-05-30
### Added
- Email-Box component now can add multiple emails at the same time when separeted by comma or semicolon and pressing Enter.

## [3.0.0] - 2024-03-11
### Added
- Upgrade to Capacitor 6.
### Changed
- CounterUrl to reuse DatasourceUrl.

## [2.0.0] - 2023-09-14
### Added
- Upgrade to Capacitor 5

## [1.0.1] - 2023-05-18
### Fixed
- Workaround to update the UI from the outside using props with simple types.

## [0.0.4] - 2022-11-29
### Added
- File Uploader component

## [0.0.3] - 2022-11-09
### Added
- Email box component
- Ocr component

## [0.0.2] - 2022-11-09
### Added
- Object Counter component

## [0.0.1] - 2022-10-05
### Added
- Multidropdown component
- Dialog component