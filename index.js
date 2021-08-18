const data = {
    
}

// for (const [key, value] of Object.entries(data)) {
//     console.log(key)
//     const input = document.getElementById(key);
//     console.log(input);
//     input.value = [key][value];
// }

// let testValue = data.charName;
// input.value = testValue;

const handleFieldChange = (id, value) => {
    data[id] = value
    console.log(`${data[id]}`);
}

const handleFormSubmit = () => {
    console.log(data);
}