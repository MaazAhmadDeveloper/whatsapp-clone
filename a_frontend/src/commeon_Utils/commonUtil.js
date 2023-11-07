export const TimeFormate = (date)=>{

    const hours = new Date(date).getHours();
    const minute = new Date(date).getMinutes();

    return `${hours < 10 ? "0"+hours : hours }:${minute < 10 ? "0"+minute : minute }`
}


export const downloadMedia = (e , imageUrl)=>{
    try {
        fetch(imageUrl)
        .then(resp => resp.blob())
        .then(blob =>{
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement("a");
            a.style.display = "none";
            a.href = url;

            const nameSplit = imageUrl.split("/");
            const duplicateName = nameSplit.pop();

            a.download = "" + duplicateName + "";
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        })
        .catch(error => console.log("error while downloading the image" + error.message));
    } catch (error) {
        console.log("error while downloading the image" + error.message);
    }
}