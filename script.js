document.getElementById('quizForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const userAnswers = Array.from(document.querySelectorAll('.question input')).map(input => parseInt(input.value));
    const trueLoveAnswers = [5, 5, 5, 1, 1]; // Example desired answers
    let totalCompatibilityScore = 0;

    for (let i = 0; i < userAnswers.length; i++) {
        totalCompatibilityScore += Math.abs(userAnswers[i] - trueLoveAnswers[i]);
    }

    const finalScore = 100 - (totalCompatibilityScore * 10); // Scale score

    let resultMessage;
    if (finalScore >= 80) {
        resultMessage = "You're a true love match!";
    } else if (finalScore >= 50) {
        resultMessage = "You might be friends!";
    } else {
        resultMessage = "Run away!";
    }

    document.getElementById('result').innerHTML = `<h2>Your Compatibility Score: ${finalScore}</h2><p>${resultMessage}</p>`;
});