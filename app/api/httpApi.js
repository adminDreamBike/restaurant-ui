import axios from 'axios'

export const searchRecipes = async ({ url, params }) => {
    // const results = await axios.get(url, {
    //     headers: {
    //         'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
    //         'x-rapidapi-key': 'd565c653a8msh697abf153646c05p17fbb2jsn9ff4867e5c64'
    //     },
    //     params
    // })
    const results = await axios.get(url)
    .then(response => {

        return response.data
    })

    return results
}