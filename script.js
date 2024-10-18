document.getElementById('quizForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const userAnswers = Array.from(document.querySelectorAll('.question input')).map(input => parseInt(input.value));
    const trueLoveAnswers = [5, 5, 5, 1, 1];
    let totalCompatibilityScore = 0;

    // Store individual compatibility scores
    const individualScores = [];

    for (let i = 0; i < userAnswers.length; i++) {
        const scoreDifference = Math.abs(userAnswers[i] - trueLoveAnswers[i]);
        const individualScore = Math.max(0, 10 - (scoreDifference * 2)); // Scale score to 0-10
        individualScores.push(individualScore);
        totalCompatibilityScore += individualScore; // Sum individual scores instead of score differences
    }

    const maxIndividualScore = individualScores.length * 10; // Maximum score (10 per question)
    const finalPercentage = ((totalCompatibilityScore / maxIndividualScore) * 100).toFixed(2); // Calculate percentage

    let resultMessage;
    if (finalPercentage >= 80) {
        resultMessage = "You're a true love match!";
    } else if (finalPercentage >= 50) {
        resultMessage = "Maybe we could be friends!";
    } else {
        resultMessage = "No way!";
    }

    // Display the overall compatibility percentage score
    let resultHTML = `<p>Your Overall Compatibility Score: ${totalCompatibilityScore} / ${maxIndividualScore} (${finalPercentage}%)</p>
    <p>${resultMessage}</p>`;

    // Display individual question scores
    resultHTML += '<p>Individual Question Compatibility Scores:</p><ul>';
    individualScores.forEach((score, index) => {
        resultHTML += `<ul>Question ${index + 1}: ${score} / 10</ul>`;
    });
    resultHTML += '</ul>';

    document.getElementById('result').innerHTML = resultHTML;
});
