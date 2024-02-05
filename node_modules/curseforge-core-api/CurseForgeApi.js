const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

class CurseForgeApi{   
    #headers

    constructor({api_key, gameId = ""}){
        this.gameId = gameId
        this.baseUrl = "https://api.curseforge.com"
        this.#headers = {
            'Content-Type':'application/json',
            'Accept':'application/json',
            'x-api-key':api_key
          };
    }

    async getGames(){
        return fetch(new URL("/v1/games", this.baseUrl).toString(), {method: 'GET', headers: this.#headers})
        .then(async (res) => {
            if(res.status !== 200) throw new Error("Error: Resource does not exist")

            return res.json().then(res => res.data);
        })
    }

    async getGame({gameId = this.gameId} = {}){  
        const promises = [
            fetch(new URL(`/v1/games/${gameId}`, this.baseUrl).toString(), {method: 'GET', headers: this.#headers}),
            fetch(new URL(`/v1/games/${gameId}/versions`, this.baseUrl).toString(), {method: 'GET', headers: this.#headers}),
            fetch(new URL(`/v1/games/${gameId}/version-types`, this.baseUrl).toString(), {method: 'GET', headers: this.#headers})
        ]

        const [game, versions, versionTypes] = await Promise.allSettled(promises).then(res => {
            res.forEach(res => {
                if(res.value.status !== 200) throw new Error("Error: Resource does not exist")
            })
            return res
        })

        return {
            game: (await game.value.json()).data,
            versions: (await versions.value.json()).data,
            versionTypes: (await versionTypes.value.json()).data
        }
    }

    async getCategories({gameId = this.gameId} = {}){
        return fetch(new URL(`/v1/categories?gameId=${gameId}`, this.baseUrl).toString(), {method: 'GET', headers: this.#headers})
        .then(async (res) => {
            if(res.status !== 200) throw new Error("Error: Resource does not exist")

            return res.json().then(res => res.data);
        })
    }


    async searchMods(parameters = {}){
        const url = new URL(`/v1/mods/search`, this.baseUrl)

        if(!parameters.hasOwnProperty("gameId")){
            parameters.gameId = this.gameId
        }

        for (const [key, value] of Object.entries(parameters)) {
            if(typeof value !== "undefined" || value !== ""){
                url.searchParams.set(key, value)
            }
        }

        return fetch(url.toString(), {method: 'GET', headers: this.#headers})
        .then(async (res) => {
            if(res.status !== 200) throw new Error("Error: Resource does not exist")

            return res.json().then(res => res.data);
        })
    }


    async getMod({modId} = {}){
        if(typeof modId === "undefined") throw new Error("Provide modId")
        
        const promises = [
            fetch(new URL(`/v1/mods/${modId}`, this.baseUrl).toString(), {method: 'GET', headers: this.#headers}),
            fetch(new URL(`/v1/mods/${modId}/description`, this.baseUrl).toString(), {method: 'GET', headers: this.#headers})
        ]
        const [mod, description] = await Promise.allSettled(promises).then(res => {
            res.forEach(res => {
                if(res.value.status !== 200) throw new Error("Error: Resource does not exist")
            })
            return res
        })

        return {
            mod: (await mod.value.json()).data,
            description: (await description.value.json()).data,
        }
    }

    async getMods({modIds} = {}){
        if(typeof modIds === "undefined") throw new Error("Provide modIds")

        const body = {
            modIds: modIds
        }

        return fetch(new URL(`/v1/mods`, this.baseUrl).toString(), {method: 'POST', headers: this.#headers, body:JSON.stringify(body)})
        .then(async (res) => {
            if(res.status !== 200) throw new Error("Error: Resource does not exist")

            return res.json().then(res => res.data);
        })
    }

    async getFeaturedMods({gameId = this.gameId, excludedModIds, gameVersionTypeId} = {}){
        const body = {
            gameId: gameId,
            excludedModIds: excludedModIds,
            gameVersionTypeId: gameVersionTypeId
        }

        return fetch(new URL(`/v1/mods/featured`, this.baseUrl).toString(), {method: 'POST', headers: this.#headers, body:JSON.stringify(body)})
        .then(async (res) => {
            if(res.status !== 200) throw new Error("Error: Resource does not exist")

            return res.json().then(res => res.data);
        })
    }

    async getModFile({modId, fileId} = {}){
        if(typeof modId == 'undefined' || typeof fileId == "undefined"){
            throw new Error("Provide all needed parameters")
        }

        const url = new URL(`/v1/mods/${modId}/files/${fileId}`, this.baseUrl)

        const promises = [
            fetch(url.toString(), {method: 'GET', headers: this.#headers}),
            fetch(new URL(`/changelog`,url).toString(), {method: 'GET', headers: this.#headers}),
            fetch(new URL(`/download-url`,url).toString(), {method: 'GET', headers: this.#headers})
        ]

        const [modFile, changelog, downloadUrl] = await Promise.allSettled(promises).then(res => {
            res.forEach(res => {
                if(res.value.status !== 200) throw new Error("Error: Resource does not exist")
            })
            return res
        })

        return {
            modFile: (await modFile.value.json()).data,
            changelog: (await changelog.value.json()).data,
            downloadUrl: (await downloadUrl.value.json()).data
        }
    }


    async getModFiles({modId, parameters = {}}){
        if(typeof modId === "undefined") throw new Error("Provide modId")

        const url = new URL(`/v1/mods/${modId}/files`, this.baseUrl)

        for (const [key, value] of Object.entries(parameters)) {
            if(typeof value !== "undefined" || value !== ""){
                url.searchParams.set(key, value)
            }
        }
        return fetch(url.toString(), {method: 'GET', headers: this.#headers})
        .then(async (res) => {
            if(res.status !== 200) throw new Error("Error: Resource does not exist")

            return res.json().then(res => res.data);
        })
    }

    async getModsFiles({fileIds} = {}){
        if(typeof fileIds === "undefined") throw new Error("Provide fileIds")

        const body = {
            fileIds: fileIds
        }

        return fetch(new URL(`/v1/mods/files`, this.baseUrl), {method: 'POST', headers: this.#headers, body:JSON.stringify(body)})
        .then(async (res) => {
            if(res.status !== 200) throw new Error("Error: Resource does not exist")

            return res.json().then(res => res.data);
        })
    }

    async getVersions({version = "", parameters = {}} = {}){
        const url = new URL(`/v1/minecraft/version/${version}`, this.baseUrl)

        for (const [key, value] of Object.entries(parameters)) {
            if(typeof value !== "undefined" || value !== ""){
                url.searchParams.set(key, value)
            }
        }
        return fetch(url.toString(), {method: 'GET', headers: this.#headers})
        .then(async (res) => {
            if(res.status !== 200) throw new Error("Error: Resource does not exist")

            return res.json().then(res => res.data);
        })
    }

    async getModLoaders({modloader = "", parameters = {}}){
        const url = new URL(`/v1/minecraft/modloader/${modloader}`, this.baseUrl)

        for (const [key, value] of Object.entries(parameters)) {
            if(typeof value !== "undefined" || value !== ""){
                url.searchParams.set(key, value)
            }
        }

        return fetch(url.toString(), {method: 'GET', headers: this.#headers})
        .then(async (res) => {
            if(res.status !== 200) throw new Error("Error: Resource does not exist")

            return res.json().then(res => res.data);
        })
    }
}

module.exports = CurseForgeApi