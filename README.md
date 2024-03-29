# Task List

![Task List](screenshot.png "Task List")

# Features

- Drag & Drop ordering
- List export and import
- Link wrapping either by full URL or markdown style `[text](url)`

Possible future features:

- Notifications or remainders about task due date/time
- Repeatable tasks, e.g. daily / weekly / custom date
- Theme selection dark/light or own custom color theme

___

# Setup

## Compiling assets

1. Install dependencies `npm install`
2. Run `npm run production` or `npm run dev`, `npm run watch`

# Installation

For development load the extension from `./src` directory. Otherwise load a build from [#build](#build-a-zip) command.

## Adding extension to Chrome

1. Navigate to `chrome://extensions/`
2. Enable "Developer mode"
3. Click on "Load unpacked" and select the directory which contains the extensions manifest file

## Adding extension to Edge

1. Navigate to `edge://extensions/`
2. Enable "Developer mode"
3. Click on "Load unpacked" and select the directory which contains the extensions manifest file

## Adding extension to Firefox

1. Navigate to `about:debugging`
2. Click on "This Firefox"
3. Click on "Load Temporary Add-on" and select manifest file inside extensions root directory

___

# Build a zip

Run `npm run build`, which creates a **.zip** file under **dist** directory. 

This zip will only contain the necessary files for the extension.

# Headless mode

- `npm run start:firefox` for quick testing in Firefox
- `npm run start:chrome` for quick testing in Chrome