const userData = [
    {
        "user_id": "1",
        "name": "Aditya Ganguly",
        "user_email": "hikeradi@gmail.com",
        "organization_name": "Org A"
    },
    {
        "user_id": "2",
        "name": "Mufassir Azam",
        "user_email": "mufos@gmail.com",
        "organization_name": "Org B"
    },
    {
        "user_id": "3",
        "name": "Adnan Khurshid",
        "user_email": "adnan@gmail.com",
        "organization_name": "Org C"
    },
    {
        "user_id": "4",
        "name": "Kabir Singh",
        "user_email": "kabir@gmail.com",
        "organization_name": "Org D"
    },
    {
        "user_id": "5",
        "name": "Amartya Chakroborty",
        "user_email": "amarc@gmail.com",
        "organization_name": "Org E"
    },
    {
        "user_id": "12345",
        "name": "Nirmalya Chowdhury",
        "user_email": "nc@gmail.com",
        "organization_name": "Org F"
    },
];

// Function to get user data by ID
function getUserDataById(userId) {
    return userData.find(user => user.user_id === userId);
}


// Exporting the function
module.exports = {
    getUserDataById,
    userData
};
