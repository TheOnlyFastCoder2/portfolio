

class Api  {
    private BD: Partial<IBD> = {};
    
    initApi(): Promise<IBD> {
        return fetch('/bd.json').then((resp) => {
            return resp.json();
        })
        
    }

    set setBD(data: IBD) {
        this.BD = data;
    }

    get Projects (): IBD["projects"] {
        return this.BD["projects"]!;
    }

    get AboutMe (): IBD["aboutMe"] {
        return this.BD["aboutMe"]!;
    }

    get skills() : IBD["aboutMe"]["skills"] {
        return this.BD["aboutMe"]!["skills"]!;
    }
    
}

export default Api;


export interface IBD {
     projects:  {srcImg:string, github:string, website:string}[],
     aboutMe: {
         story: {
            headline: string,
            text: string
         },
         skills: [string,string][]
     }
 }
 
