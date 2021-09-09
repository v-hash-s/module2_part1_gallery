const url: string =  'https://glq7fjiy07.execute-api.us-east-1.amazonaws.com/api/login';
const form = document.getElementById('login') as HTMLFormElement;
const regex: RegExp = /^\b([0-9A-Z])+\b$/gi

interface UserData {
    email: string; 
    password: string
}

interface User {
    email: string;
    password: string;
}

interface ErrorMessage {
    errorMessage: string;
}

class User implements User{
    email: string;
    password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }

    isCorrectPassword(): boolean {
        if(this.password.match(regex)) return true;
        else {
            alert("Invalid form of password");
            return false;
        }
    }
}

function getUserData(): UserData {
    let userData = {}
    return userData = {
        email: (<HTMLInputElement>document.getElementById("userEmail")).value,
        password: (<HTMLInputElement>document.getElementById("userPassword")).value,
    }
}

form.addEventListener('submit', async(event) => {
    event.preventDefault();

    let {email, password} = getUserData() 
    let user: User = new User(email, password)

    if(!user.isCorrectPassword()) return;

    try {
        let response: Response = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
        let result: ErrorMessage | any = await response.json();

        if(result.errorMessage) return alert(result.errorMessage);            
        
        localStorage.setItem('token', result.token);

        if(localStorage.getItem('token')){
            let time = new Date();
            localStorage.setItem('time', String(time.getUTCMinutes()));
            document.location.replace('../public/gallery.html');
        }

    } catch(err: any){
        alert(err.message);
    }
})