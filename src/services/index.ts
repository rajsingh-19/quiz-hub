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
export const getSubById = (quizId: string, token: string): Promise<Response> => {
    return fetch(`${apiUrl}api/quiz/sub/${quizId}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
};

//          Create the score and attach to the user by it's id
export const createScore = (subId: string, userId: string, token: string, score: number, rightAns: number, wrongAns: number): Promise<Response> => {
    return fetch(`${apiUrl}api/score/${subId}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ userId, score, rightAns, wrongAns })
    })
};

//          Get Quiz by user id
export const getScoreByQuizId = (quizId: string, token: string): Promise<Response> => {
    return fetch(`${apiUrl}api/score/${quizId}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
};

//      Get All Scores by sub id
export const getAllScores = (subId: string, token: string): Promise<Response> => {
    return fetch(`${apiUrl}api/scores/sub/${subId}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
};
