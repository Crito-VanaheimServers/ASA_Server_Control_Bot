
# CurseForge API (Eternal API)
Implements methods for CurseForge API usage

Package is still in development



## Installation

```javascript
  npm install curseforge-core-api
```

## Deployment

To import all functions use
```javascript
  const { CurseForgeApi } = require("curseforge-core-api");
  const ModsApi = new CurseForgeApi({
    api_key: YOUR_API_KEY
})
```

## Available methods

| Function name             | Description                                                                |
| ----------------- | ------------------------------------------------------------------ |
| getGames() | Get all games that are available to the provided API key. |
| getGame()  | Get information about provided modification - full info, versions, version types |
| getCategories() | Get all available classes and categories of the specified game. |
| searchMods() | Get all mods that match the search criteria. |
| getMod() | Get a single mod information |
| getMods() | Get a list of mods |
| getFeaturedMods() | Get a list of featured, popular and recently updated mods |
| getModFile() | Get a single file of the specified mod |
| getModFiles() | Get all files of the specified mod |
| getModsFiles() | Get a list of files |
| getVersions() | Get Minecraft Versions |
| getModLoaders() | Get Minecraft ModLoaders |




## Usage

```javascript

//Standard initialization
const { CurseForgeApi, CurseForgeGamesIDs, CurseForgeMcModLoader } = require("curseforge-core-api");
const ModsApi = new CurseForgeApi({
    api_key: YOUR_API_KEY
})

//You can also provide gameId to omit it in some used methodes
const ModsApi = new CurseForgeApi({
    api_key: YOUR_API_KEY,
    gameId: CurseForgeGamesIDs.Minecraft
})

//Usage with top level await
//The data provided in methods is exemplary

const games = await ModsApi.getGames()


const {game, versions, versionTypes} = await ModsApi.getGame({
  gameId: CurseForgeGamesIDs.Minecraft
})


const categories = await ModsApi.getCategories({
  gameId: CurseForgeGamesIDs.Minecraft
})


//All available parameters https://docs.curseforge.com/#search-mods
const search = await ModsApi.searchMods({
  gameId: CurseForgeGamesIDs.Minecraft,
  searchFilter: "cool mod",
  modLoaderType: CurseForgeMcModLoader.Forge
})


const {mod, description} = await ModsApi.getMod({
  modId: 642
})


const mods = await ModsApi.getMods({
  modIds: [642, 324, 657]
})


const featuredMods = await ModsApi.getFeaturedMods({
  gameId: CurseForgeGamesIDs.Minecraft,
  excludedModIds = [642, 324, 657],
  gameVersionTypeId: 12
})


const {modFile, changelog, downloadUrl} = await ModsApi.getModFile({
  modId: 642,
  fileId: 32123.
})


//Parameter fileId add parameters is optional
//All available parameters https://docs.curseforge.com/#get-mod-files
const modFiles = await ModsApi.getModFiles({
  modId: 642,
  parameters: {
    gameVersion: "1.19.2",
    modLoaderType: CurseForgeMcModLoader.Forge
  }
})

const modFiles = await ModsApi.getModsFiles({
    fileIds: [123, 456, 865]
})


//Parameter version is optional
//Parameter "parameters" only works when "version" is not version
//All available parameters https://docs.curseforge.com/#get-minecraft-versions
await ModsApi.getVersions({
  version: "1.19.2"
})

await ModsApi.getVersions({
    parameters: {
      sortDescending: True
  }
})

//Parameter "modloader" is optional.
//Parameter "parameters" only works when "modloader" is not provided
//All available parameters https://docs.curseforge.com/#get-minecraft-modloaders
await ModsApi.getModLoaders({
  modloader: "forge-9.11.1.965"
})

await ModsApi.getModLoaders({
  parameters: {
      version: "1.19.2",
      includeAll: True
  }
})
```
## Contact

If you have any feedback, please write to qiufilms@gmail.com

