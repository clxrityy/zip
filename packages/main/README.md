# Zip

##### @clxrity/zip

A React library for zipping and unzipping files in the browser.

## Installation

```zsh
npm install @clxrity/zip
```

```zsh
yarn add @clxrity/zip
```

```zsh
pnpm add @clxrity/zip
```

---

## Component usage (client-side)

### Zipping files

###### With Next.js
```tsx
'use client';
import { FileUpload } from '@clxrity/zip/client';

export default function Page() {
  return (
	<div>
	  <h1>Upload a file</h1>
	  <FileUpload
	  	mode="zip" // 'zip' or 'unzip' (default is 'zip')
		onBeforeZip={(files) => {
			// Handle files before zipping
			console.log('Files to zip:', files);
			return files; // Return the files to be zipped
		}}
		onAfterZip={(blob) => {
			// Handle the zipped file
			console.log('Zipped file:', blob);
		})
	  />
	</div>
  )
}
```

![File Upload Example](https://raw.githubusercontent.com/clxrityy/zip/refs/heads/master/examples/img/upload-zip-example.gif?token=GHSAT0AAAAAACYPH7AKX7RK23JRPGTTWRUE2BXPAOA)
