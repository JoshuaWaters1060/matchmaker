const TRUE_LOVE_ANSWERS = [4, 3, 5, 1, 1];
const MAX_SCORE_PER_QUESTION = 10;
const SCORE_THRESHOLD_HIGH = 80;
const SCORE_THRESHOLD_MEDIUM = 50;

function validate(userAnswers) {
    let isValid = true;
    const errorMessages = [];

    userAnswers.forEach((answer, index) => {
        if (isNaN(answer) || answer < 1 || answer > 5) {
            isValid = false;
            errorMessages.push(`Question ${index + 1}: Please enter a valid answer (1-5).`);
        }
    });

    if (!isValid) {
        alert(errorMessages.join('\n'));
    }

    return isValid;
}

document.getElementById('quizForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const userAnswers = Array.from(document.querySelectorAll('.question input'))
                             .map(input => parseInt(input.value));

    if (!validate(userAnswers)) {
        return; 
    }

    let totalCompatibilityScore = 0;
    const individualScores = [];

    for (let i = 0; i < userAnswers.length; i++) {
        const scoreDifference = Math.abs(userAnswers[i] - TRUE_LOVE_ANSWERS[i]);
        const individualScore = Math.max(0, MAX_SCORE_PER_QUESTION - (scoreDifference * 2)); 
        individualScores.push(individualScore);
        totalCompatibilityScore += individualScore;
    }

    const maxIndividualScore = individualScores.length * MAX_SCORE_PER_QUESTION;
    const finalPercentage = ((totalCompatibilityScore / maxIndividualScore) * 100).toFixed(2);

    let resultMessage;
    if (finalPercentage >= SCORE_THRESHOLD_HIGH) {
        resultMessage = "You're a true love match!";
    } else if (finalPercentage >= SCORE_THRESHOLD_MEDIUM) {
        resultMessage = "Maybe we could be friends!";
    } else {
        resultMessage = "No way!";
    }

    
    let resultHTML = `<p>Your Overall Compatibility Score: ${totalCompatibilityScore} / ${maxIndividualScore} (${finalPercentage}%)</p>
    <p>${resultMessage}</p>`;

    
    resultHTML += '<p>Individual Question Compatibility Scores:</p><ul>';
    individualScores.forEach((score, index) => {
        resultHTML += `<p>Question ${index + 1}: ${score} / 10</p>`;
    });
    resultHTML += '</ul>';

    document.getElementById('result').innerHTML = resultHTML;
});
