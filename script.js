document.getElementById('quizForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const userAnswers = Array.from(document.querySelectorAll('.question input')).map(input => parseInt(input.value));
    const trueLoveAnswers = [5, 5, 5, 1, 1];
    let totalCompatibilityScore = 0;

    for (let i = 0; i < userAnswers.length; i++) {
        totalCompatibilityScore += Math.abs(userAnswers[i] - trueLoveAnswers[i]);
    }

    const finalScore = 100 - (totalCompatibilityScore * 10); 

    let resultMessage;
    if (finalScore >= 80) {
        resultMessage = "You're a true love match!";
    } else if (finalScore >= 50) {
        resultMessage = "Maybe we could be friends!";
    } else {
        resultMessage = "No way!";
    }

    document.getElementById('result').innerHTML = `<p>Your Compatibility Score: ${finalScore}</p><p>${resultMessage}</p>`;
});
