chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "extract_product") {
        fetch("http://localhost:5000/api/recommendations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(message.data)
        })
        .then(response => response.json())
        .then(recommendations => {
            chrome.storage.local.set({ recommendations });
        })
        .catch(err => console.error(err));
    }
});
