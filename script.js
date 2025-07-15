//Main Generator
const generatorForm = document.getElementById('generator-form');
const resultParagraph = document.getElementById('result-paragraph');

function paragraphResultChange(paragraph, name, age, place, isMarried)
{
    paragraph.textContent = 
           `“My name is ${name}. I\'m ${age} years old.
            My house is in ${place}, where all the villas are, and I am ${isMarried}.
            I work as an employee for the Kame Yu department stores, and I get home every day by 8 PM at the latest.
            I don\'t smoke, but I occasionally drink.
            I\'m in bed by 11 PM, and make sure I get eight hours of sleep, no matter what.
            After having a glass of warm milk and doing about twenty minutes of stretches before going to bed,
            I usually have no problems sleeping until morning.
            Just like a baby, I wake up without any fatigue or stress in the morning.
            I was told there were no issues at my last check-up.
            I\'m trying to explain that I\'m a person who wishes to live a very quiet life.
            I take care not to trouble myself with any enemies, like winning and losing, that would cause me to lose sleep at night.
            That is how I deal with society, and I know that is what brings me happiness.
            Although, if I were to fight, I wouldn\'t lose to anyone.”`;
}

//Random Everything
const formFields =
{   //remember to add new input to formFields
    name: generatorForm.elements['name'],
    age: generatorForm.elements['age'],
    place: generatorForm.elements['place'],
    isMarried: generatorForm.elements['is-married'],
}

const allInputsExceptRandomEverything = generatorForm.querySelectorAll("input:not(#random-everything)")

function disableAllInputs(allInputsArray, disabled)
{
    allInputsArray.forEach(function(input)
    {
        input.disabled = disabled;
    })
}

function getRandomFromArray(array) 
{
  return array[Math.floor(Math.random() * array.length)];
  //Math.floor = round down (2.9->2)
  //Math.random() = random between 0-1 (e.g. 0.22, 0.99)
  // * arry.length -> random between 0-array.length (e.g. 4 items = 0-1-2-3 get rounded down)
}

const randomEverythingChecked = document.getElementById('random-everything');

function disableInputsWhenRandomEverythingChecked()
{
if(randomEverythingChecked.checked)
{
    disableAllInputs(allInputsExceptRandomEverything, true);
}
else
{
    disableAllInputs(allInputsExceptRandomEverything, false);
}
}


function generatorFormInput(event)
    {
        event.preventDefault() //ngăn reload page
        if (randomEverythingChecked.checked)
        {   
            let randomList = {}
            fetch("randomList.json")
            .then(response => response.json())
            .then(json => {randomList = json;
            formFields.name.value = getRandomFromArray(randomList.name);
            formFields.age.value = getRandomFromArray(randomList.age);
            formFields.place.value = getRandomFromArray(randomList.place);
            formFields.isMarried.value = getRandomFromArray(randomList.isMarried);

            let name = formFields.name.value.trim();
            let age = formFields.age.value.trim();
            let place = formFields.place.value.trim();
            let isMarried = formFields.isMarried.value.trim();
            
            paragraphResultChange(resultParagraph, name, age, place, isMarried);
            });
        }
        else
        {
            const formData = new FormData(generatorForm);

            let name = formData.get('name').trim() || "Yoshikage Kira";
            let age = formData.get('age') || "33";
            let place = formData.get('place').trim() || "the northeast section of Morioh";
            let isMarried = formData.get('is-married').trim();

            paragraphResultChange(resultParagraph, name, age, place, isMarried);
        }
    };

randomEverythingChecked.addEventListener("change", disableInputsWhenRandomEverythingChecked);

generatorForm.addEventListener('submit', generatorFormInput);

