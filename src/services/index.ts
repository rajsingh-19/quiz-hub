const apiUrl = import.meta.env.VITE_API_URL;

//              register a user
export const registerUser = (userData: {
    name: string,
    email: string,
    mobile: string,
    password: string
}):Promise<Response> => {
    return fetch(`${apiUrl}auth/register`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })    
};

//              login the user
export const loginUser = (userData: {
    email: string,
    password: string
}):Promise<Response> => {
    return fetch(`${apiUrl}auth/login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
};

//              get all the quizzes
export const getAllQuiz = () => {
    return fetch(`${apiUrl}api/quizzes`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    })
};

//          Get subjects by category name
export const getSubByCategory = (category: string):Promise<Response> => {
    return fetch(`${apiUrl}api/quiz/?category=${category}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    })
};

//          Get a subject by its id
export const getSubById = (id: string): Promise<Response> => {
    return fetch(`${apiUrl}api/quiz/sub/${id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`
        }
    })
};
