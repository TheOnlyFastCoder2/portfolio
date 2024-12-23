

class Api  {
    private BD: Partial<IDB> = {};
    
    initApi(): Promise<IDB> {
        return fetch('/bd.json').then((resp) => {
            return resp.json();
        })
        
    }

    set setBD(data: IDB) {
        this.BD = data;
    }

    get Projects (): IDB["projects"] {
        return this.BD["projects"]!;
    }

    get AboutMe (): IDB["aboutMe"] {
        return this.BD["aboutMe"]!;
    }

    get skills() : IDB["aboutMe"]["skills"] {
        return this.BD["aboutMe"]!["skills"]!;
    }

    get contacts() : IDB["contacts"] {
        return this.BD["contacts"]!;
    }
    
}

export default Api;

export const typesOfProjects = ['app', 'landing', 'game'] as const;
export type  TProjects = typeof typesOfProjects[number];
export interface IProject {
    srcImg:string, github:string, 
    website:string, type: TProjects, srcReadme: string,
}

export interface IDB {
     projects:  IProject[],
     aboutMe: {
         story: {
            headline: string,
            text: string
         },
         skills: [string,string][]
     }

     contacts: {
        vk: string,
        telegram: string,
        github: string,
        discord: string,
    }
 }
 
