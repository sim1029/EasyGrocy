import localData from "../components/localData";

const { getToken, getLocalUserInfo } = localData();

const colors = () => {

    const colorArr = ["blueviolet", "chartreuse", "black", "darkblue", "darkorange", "deeppink", "forestgreen", "fuchsia", "gold", "lightblue", "lightcoral"];

    const getColors = async () => {
        const userInfo = await getLocalUserInfo();
        const token = await getToken();
        const collection = new Map();
        const response = await fetch(`https://easygrocy.com/api/group/${userInfo.active_squad.id}/users`, {
            headers: {
                'Authorization': 'Bearer ' + token,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        const handleRes = async (response) => {
            if(!response.ok) throw new Error(response.status);
            else return response.json();
        }
        const json = await handleRes(response).catch((error) => console.error(error));
        
        const createDict = async (json) => {
            const collection = new Map();
            const users = json.users;
            for(let i in users){
                collection.set(json.users[i].name, colorArr[i])
            }
            return collection;
        }
        const ret = await createDict(json);
        return ret
    }

    return {
        getColors
    }

}

export default colors;