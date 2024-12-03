document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get("recommendations", (data) => {
        const recommendationsList = document.getElementById("recommendations-list");
        if (data.recommendations) {
            data.recommendations.forEach(item => {
                const listItem = document.createElement("li");
                listItem.innerHTML = `<strong>${item.name}</strong> - Score: ${item.sustainabilityScore}`;
                recommendationsList.appendChild(listItem);
            });
        } else {
            recommendationsList.innerHTML = "<li>No recommendations available.</li>";
        }
    });
});
