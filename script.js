const generatorForm = document.getElementById('generator-form');
const resultParagraph = document.getElementById('result-paragraph');

//Remember to add new input to formFields
const formFields =
{   
    name: generatorForm.elements['name'],
    age: generatorForm.elements['age'],
    house: generatorForm.elements['house'],
    isMarried: generatorForm.elements['is-married'],
    workplace: generatorForm.elements['workplace'],
    timeGetHome: generatorForm.elements['timeGetHome'],
    timeToSleep: generatorForm.elements['timeToSleep']
}

function paragraphResultChange(paragraph, name, age, house, isMarried, workplace,
    timeGetHome, timeToSleep)
{
    paragraph.textContent = 
           `“My name is ${name}. I\'m ${age} years old.
            My house is in ${house}, where all the villas are, and I am ${isMarried}.
            I work as an employee for ${workplace}, and I get home every day by ${timeGetHome} at the latest.
            I don\'t smoke, but I occasionally drink.
            I\'m in bed by ${timeToSleep}, and make sure I get eight hours of sleep, no matter what.
            After having a glass of warm milk and doing about twenty minutes of stretches before going to bed,
            I usually have no problems sleeping until morning.
            Just like a baby, I wake up without any fatigue or stress in the morning.
            I was told there were no issues at my last check-up.
            I\'m trying to explain that I\'m a person who wishes to live a very quiet life.
            I take care not to trouble myself with any enemies, like winning and losing, that would cause me to lose sleep at night.
            That is how I deal with society, and I know that is what brings me happiness.
            Although, if I were to fight, I wouldn\'t lose to anyone.”`;
}

function paraReset(paragraph)
{
    paragraph.innerHTML = "<i>*Result will generate here.</i>";
};

const allInputsExceptRandomEverything = generatorForm.querySelectorAll("input:not(#random-everything), select") //thêm disable ở đây
function disableAllInputs(InputsArray, disabled)
{
    InputsArray.forEach(function(input)
    {
        input.disabled = disabled;
    })
}

function getRandomFromArray(array) 
{
  return array[Math.floor(Math.random() * array.length)];
  //Math.floor -> round down (2.9->2)
  //Math.random() -> random between 0-1 (e.g. 0.22, 0.99)
  //* arry.length -> random between 0-array.length (e.g. 4 items = 0-1-2-3 get rounded down)
}

const randomEverythingChecked = document.getElementById('random-everything');
const randomIfBlank = document.getElementById('randomifblank');

randomEverythingChecked.addEventListener("change", function()
    {   
        console.log('RandomEverything Checkbox changed');
        if (randomEverythingChecked.checked)
            disableAllInputs(allInputsExceptRandomEverything, true);
        else
            disableAllInputs(allInputsExceptRandomEverything, false);
    }
);

function generatorFormInput(event)
{
    event.preventDefault(); //ngăn reload page
    console.log('Submit button was pressed');
    //load xong file json trước
    let randomList = {}
        fetch("randomList.json")
        .then(response => response.json())
        .then(json => 
        {      
            randomList = json;

            let rName = getRandomFromArray(randomList.name);
            let rAge = getRandomFromArray(randomList.age);
            let rHouse = getRandomFromArray(randomList.house);
            let rIsMarried = getRandomFromArray(randomList.isMarried);
            let rWorkplace = getRandomFromArray(randomList.workplace);
            let rTimeGetHome = getRandomFromArray(randomList.timeGetHome);
            let rTimeToSleep = getRandomFromArray(randomList.timeGetHome);

            let name = formFields.name.value.trim() || "Yoshikage Kira";
            let age = formFields.age.value.trim() || "33";
            let house = formFields.house.value.trim() || "the northeast section of Morioh";
            let isMarried = formFields.isMarried.value.trim();
            let workplace = formFields.workplace.value.trim() || "the Kame Yu department stores";
            let timeGetHome = formFields.timeGetHome.value.trim();
            let timeToSleep = formFields.timeToSleep.value.trim();

            if (randomEverythingChecked.checked)
            {   
                name = rName;
                age = rAge;
                house = rHouse;
                isMarried = rIsMarried;
                workplace = rWorkplace;
                timeGetHome = rTimeGetHome;
                timeToSleep = rTimeToSleep;
                    
                paragraphResultChange(resultParagraph, name, age, house, isMarried, workplace,
                        timeGetHome, timeToSleep);
            }
            else if (randomIfBlank.checked)
            {
                name = formFields.name.value.trim() || rName;
                age = formFields.age.value.trim() || rAge;
                house = formFields.house.value.trim() || rHouse;
                isMarried = isMarried;
                workplace = formFields.workplace.value.trim() || rWorkplace;
                timeGetHome = timeGetHome;
                timeToSleep = timeToSleep;

                paragraphResultChange(resultParagraph, name, age, house, isMarried, workplace,
                        timeGetHome, timeToSleep);
            }

            else
            {
                paragraphResultChange(resultParagraph, name, age, house, isMarried, workplace,
                        timeGetHome, timeToSleep);
            }
        });
}
//Event 'change' when 'reset'
generatorForm.addEventListener('reset', function (event) 
    {
        console.log('Reset button was pressed');
        setTimeout(function()
            {
                randomEverythingChecked.dispatchEvent(new Event('change'));
                paraReset(resultParagraph);
            }, 0);
        
    }
);

generatorForm.addEventListener('submit', generatorFormInput);