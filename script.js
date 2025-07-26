const generatorForm = document.getElementById('generator-form');
const generateButton = document.getElementById('generateButton');
const translateButton = document.getElementById('translateButton');
const resultParagraph = document.getElementById('result-paragraph');
translateButton.disabled = true;

let rName;
let rAge;
let rHouse;
let rIsMarried;
let rWorktitle;
let rWorkplace;
let rTimeGetHome ;
let rTimeToSleep;
let rNotDo;
let rDo;
let rWish;

let Name;
let age;
let house;
let isMarried;
let worktitle;
let workplace;
let timeGetHome;
let timeToSleep;
let notDo;
let Do;
let wish;

let tName;
let tAge;
let tHouse;
let tIsMarried;
let tWorktitle;
let tWorkplace;
let tTimeGetHome;
let tTimeToSleep;
let tNotDo;
let tDo;
let tWish;

//Remember to add new input to formFields
const formFields =
{   
    name: generatorForm.elements['name'],
    age: generatorForm.elements['age'],
    house: generatorForm.elements['house'],
    isMarried: generatorForm.elements['is-married'],
    worktitle: generatorForm.elements['worktitle'],
    workplace: generatorForm.elements['workplace'],
    timeGetHome: generatorForm.elements['timeGetHome'],
    timeToSleep: generatorForm.elements['timeToSleep'],
    notDo: generatorForm.elements['not-do'],
    Do: generatorForm.elements['do'],
    wish: generatorForm.elements['wish']
};

function paragraphResultChange(paragraph, Name, age, house, isMarried, worktitle, workplace,
    timeGetHome, timeToSleep, notDo, Do, wish)
{
    paragraph.textContent = 
           `“My name is ${Name}. I\'m ${age} years old.
            My house is in ${house}, where all the villas are, and I am ${isMarried}.
            I work as ${worktitle} for ${workplace}, and I get home every day by ${timeGetHome} at the latest.
            I don\'t ${notDo}, but I occasionally ${Do}.
            I\'m in bed by ${timeToSleep}, and make sure I get eight hours of sleep, no matter what.
            After having a glass of warm milk and doing about twenty minutes of stretches before going to bed,
            I usually have no problems sleeping until morning.
            Just like a baby, I wake up without any fatigue or stress in the morning.
            I was told there were no issues at my last check-up.
            I\'m trying to explain that I\'m a person who wishes ${wish}.
            I take care not to trouble myself with any enemies, like winning and losing, that would cause me to lose sleep at night.
            That is how I deal with society, and I know that is what brings me happiness.
            Although, if I were to fight, I wouldn\'t lose to anyone.”`;
};

function paraReset(paragraph)
{
    paragraph.innerHTML = "<i>*Result will generate here.</i>";
};

const allInputsExceptRandomEverything = generatorForm.querySelectorAll("input:not(#random-everything), select"); //thêm disable ở đây
function disableAllInputs(InputsArray, disabled)
{
    InputsArray.forEach(function(input)
    {
        input.disabled = disabled;
    })
};

function getRandomFromArray(array) 
{
  return array[Math.floor(Math.random() * array.length)];
  //Math.floor -> round down (2.9->2)
  //Math.random() -> random between 0-1 (e.g. 0.22, 0.99)
  //* arry.length -> random between 0-array.length (e.g. 4 items = 0-1-2-3 get rounded down)
};

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

let randomList = [];

async function loadRandomList() {
    const response = await fetch("randomList.json");
    const json = await response.json();
    randomList = json;

    rName = getRandomFromArray(randomList.name);
    rAge = Math.floor(Math.random() * 100) + 1;
    rHouse = getRandomFromArray(randomList.house);
    rIsMarried = getRandomFromArray(randomList.isMarried);
    rWorkplace = getRandomFromArray(randomList.workplace);
    rWorktitle = getRandomFromArray(randomList.worktitle);
    rTimeGetHome = getRandomFromArray(randomList.timeGetHome);
    rTimeToSleep = getRandomFromArray(randomList.timeGetHome);
    rNotDo = getRandomFromArray(randomList.notDo);
    rDo = getRandomFromArray(randomList.Do);
    rWish = getRandomFromArray(randomList.wish);

    Name = formFields.name.value.trim() || "Yoshikage Kira";
    age = formFields.age.value.trim() || "33";
    if (age < 1) age = age * -1;
    house = formFields.house.value.trim() || "the northeast section of Morioh";
    isMarried = formFields.isMarried.value.trim();
    worktitle = formFields.worktitle.value.trim() || "an employee";
    workplace = formFields.workplace.value.trim() || "the Kame Yu department stores";
    timeGetHome = formFields.timeGetHome.value.trim();
    timeToSleep = formFields.timeToSleep.value.trim();
    notDo = formFields.notDo.value.trim() || "smoke";
    Do = formFields.Do.value.trim() || "drink";
    wish = formFields.wish.value.trim() || "to live a very quiet life";
};

async function generateResultParagraph()
{
    await loadRandomList();
    console.log('Generate button was pressed');
    if (randomEverythingChecked.checked)
    {                       
        paragraphResultChange(resultParagraph, rName, rAge, rHouse, rIsMarried, rWorktitle, rWorkplace,
                rTimeGetHome, rTimeToSleep, rNotDo, rDo, rWish);

        tName = rName;
        tAge = rAge;
        tHouse = rHouse;
        tIsMarried = rIsMarried;
        tWorktitle = rWorktitle;
        tWorkplace = rWorkplace;
        tTimeGetHome = rTimeGetHome;
        tTimeToSleep = rTimeToSleep;
        tNotDo = rNotDo;
        tDo = rDo;
        tWish = rWish;
    }
    else if (randomIfBlank.checked)
    {
        Name = formFields.name.value.trim() || rName;
        age = formFields.age.value.trim() || rAge;
        house = formFields.house.value.trim() || rHouse;
        isMarried = isMarried;
        workplace = formFields.workplace.value.trim() || rWorkplace;
        worktitle = formFields.worktitle.value.trim() || rWorktitle;
        timeGetHome = timeGetHome;
        timeToSleep = timeToSleep;
        notDo = formFields.notDo.value.trim() || rNotDo;
        Do = formFields.Do.value.trim() || rDo;
        wish = formFields.wish.value.trim() || rWish;

        paragraphResultChange(resultParagraph, Name, age, house, isMarried, worktitle, workplace,
                timeGetHome, timeToSleep, notDo, Do, wish);

        tName = Name;
        tAge = age;
        tHouse = house;
        tIsMarried = isMarried;
        tWorktitle = worktitle;
        tWorkplace = workplace;
        tTimeGetHome = timeGetHome;
        tTimeToSleep = timeToSleep;
        tNotDo = notDo;
        tDo = Do;
        tWish = wish;
    }
    else
    {
        paragraphResultChange(resultParagraph, Name, age, house, isMarried, worktitle, workplace,
                timeGetHome, timeToSleep, notDo, Do, wish);

        tName = Name;
        tAge = age;
        tHouse = house;
        tIsMarried = isMarried;
        tWorktitle = worktitle;
        tWorkplace = workplace;
        tTimeGetHome = timeGetHome;
        tTimeToSleep = timeToSleep;
        tNotDo = notDo;
        tDo = Do;
        tWish = wish;
    }
    translateButton.disabled = false;
};

//Event 'change' when 'reset'
generatorForm.addEventListener('reset', function (event) 
    {
        console.log('Reset button was pressed');
        setTimeout(function()
            {
                randomEverythingChecked.dispatchEvent(new Event('change'));
                paraReset(resultParagraph);
                translateButton.disabled = true;
            }, 0);
        
    }
);

function translateVN(paragraph, Name, age, house, isMarried, worktitle, workplace,
                timeGetHome, timeToSleep, notDo, Do, wish)
{
    switch (Name) //done
    {
        case "Bob the Builder":
            Name = "Bob thợ xây";
            break;
        case "Active Water Cooling":
            Name = "Hệ thống tản nhiệt nước chủ động";
            break;
        case "Gilgamesh King of Heroes":
            Name = "Gilgamesh – Vua của các Anh hùng";
            break;
    };
    if (isMarried === "not married"){ isMarried = "chưa kết hôn"} 
    else { isMarried = "đã kết hôn"};
    switch(house) //done
    {
        case "the northeast section of Morioh":
            house = "khu đông bắc Morioh";
            break;
        case "Rach Gia City":
            house = "Thành phố Rạch Giá";
            break;
        case "Rome":
            house = "La Mã";
            break;
        case "Hanoi":
            house = "Hà Nội";
            break;
        case "Ho Chi Minh City":
            house = "Thành phố Hồ Chí Minh";
            break;
        case "Hong Kong":
            house = "Hồng Kông";
            break;
        case "Macau":
            house = "Ma Cao";
            break;
        case "Taipei":
            house = "Đài Bắc";
            break;
        case "Beijing":
            house = "Bắc Kinh";
            break;
        case "Shanghai":
            house = "Thượng Hải";
            break;
        case "Chengdu":
            house = "Thành Đô";
            break;
        case "Xian":
            house = "Tây An";
            break;
        case "Tokyo Tower":
            house = "Tháp Tokyo";
            break;
        case "Konoha":
            house = "Làng Lá";
            break;
        case "Gotham City":
            house = "Thành phố Gotham";
            break;
        case "Isekai":
            house = "Thế giới khác";
            break;
        case "The City":
            house = "Thành phố";
            break;
        case "Fuuto City":
            house = "Thành phố Fuuto";
            break;
        case "Ancient Rome":
            house = "La Mã cổ đại";
            break;
    };
    switch (worktitle) //done
    {
        case "an employee":
            worktitle = "nhân viên";
            break;
        case "a janitor":
            worktitle = "lao công";
            break;
        case "a wizard":
            worktitle = "pháp sư";
            break;
        case "a dog":
            worktitle = "con chó";
            break;
        case "a project manager":
            worktitle = "người quản lý dự án";
            break;
        case "a Master":
            worktitle = "Master";
            break;
        case "a Youtuber":
            worktitle = "Youtuber";
            break;
        case "a doctor":
            worktitle = "bác sĩ";
            break;
        case "S-rank Hero":
            worktitle = "anh hùng S-rank";
            break;
        case "No. 1 Hero":
            worktitle = "anh hùng hạng nhất";
            break;
    };
    switch (workplace) //done
    {
        case "the Kame Yu department stores":
            workplace = "cửa hàng Kame Yu";
            break;
        case "Viêm Dương Organization":
            workplace = "Tổ chức Viêm Dương";
            break;
        case "Mr. Popo's place":
            workplace = "Chỗ ở của Mr. Popo";
            break;
        case "Chaldea Security Organization":
            workplace = "Tổ chức An ninh Chaldea";
            break;
        case "Survey Corps Headquarters":
            workplace = "Tổng bộ Binh đoàn Trinh Sát";
            break;
        case "DIO's Mansion":
            workplace = "Dinh thự của DIO";
            break;
        case "Fuyuki City Hospital":
            workplace = "Bệnh viện Thành phố Fuyuki";
            break;
        case "Akihabara Electronics Mall":
            workplace = "Khu mua sắm điện tử Akihabara";
            break;
        case "The Clock Tower":
            workplace = "Tháp Đồng Hồ";
            break;
        case "Etihad Football Club":
            workplace = "Câu lạc bộ Bóng đá Etihad";
            break;
    };

    let [hour, period] = timeGetHome.split(" "); //split at space
        hour = parseInt(hour);
    switch (period)
    {
        case "AM":
            if (hour == 11 || hour == 12)
                timeGetHome = `${hour} giờ trưa`;
            else
                timeGetHome = `${hour} giờ sáng`;
            break;
        case "PM":
            if (hour >= 1 && hour <= 5)
                timeGetHome = `${hour} giờ chiều`;
            else if (hour == 11 || hour == 12)
                timeGetHome = `${hour} giờ trưa`;
            else
                timeGetHome = `${hour} giờ tối`;
            break;
    };

    [hour, period] = timeToSleep.split(" ");
    hour = parseInt(hour);
    switch (period)
    {
        case "AM":
            if (hour == 11 || hour == 12)
                timeToSleep = `${hour} giờ trưa`;
            else
                timeToSleep = `${hour} giờ sáng`;
            break;
        case "PM":
            if (hour >= 1 && hour <= 5)
                timeToSleep = `${hour} giờ chiều`;
            else
                timeToSleep = `${hour} giờ tối`;
            break;
    };
    switch (notDo)
    {
        case "smoke":
            notDo = "hút thuốc";
            break;
        case "drink":
            notDo = "uống rượu";
        case "eat rice":
            notDo = "ăn cơm";
            break;
        case "drink bleach":
            notDo = "uống nước tẩy";
            break;
        case "wash my hands after using the bathroom":
            notDo = "rửa tay sau khi đi vệ sinh";
            break;
        case "do backflips":
            notDo = "nhào lộn ngược";
            break;
        case "play League of Legends":
            notDo = "chơi Liên Minh Huyền Thoại";
            break;
        case "do drugs":
            notDo = "dính đến ma túy";
            break;
        case "use chopsticks to eat":
            notDo = "dùng đũa để ăn";
            break;
        case "eat pork":
            notDo = "ăn thịt heo";
            break;
    };
    switch (Do)
    {
        case "drink":
            Do = "uống rượu";
            break;
        case "smoke":
            Do = "hút thuốc";
            break;
        case "play TFT":
            Do = "chơi Đấu Trường Chân Lý";
            break;
        case "smoke weed":
            Do = "hút cần";
            break;
        case "eat children":
            Do = "ăn thịt trẻ em";
            break;
    };
    switch (wish)
    {
        case "to live a very quiet life":
            wish ="sống một cuộc đời bình yên phẳng lặng";
            break;
        case "to phá hủy An Giang":
            wish = "phá hủy An Giang";
            break;
        case "to become the Pirate King":
            wish = "trở thành Vua Hải Tặc";
            break;
        case "for a world without war":
            wish = "một thế giới không có chiến tranh";
            break;
    };


    paragraph.textContent = 
           `“Tên tôi là ${Name}. Năm nay ${age} tuổi. Nhà của tôi nằm ở ${house}, 
            nơi toàn những biệt thự, và tôi chưa kết hôn. Tôi làm ${worktitle} cho ${workplace}
            và luôn là người về nhà muộn nhất lúc ${timeGetHome}. Tôi không ${notDo}, nhưng thỉnh thoảng ${Do}. 
            Tôi đi ngủ lúc ${timeToSleep}, luôn đảm bảo ngủ đủ 8 tiếng, dù bất kì chuyện gì đi nữa. Sau khi uống một ly sữa ấm 
            và tập thể dục nhẹ 20 phút trước khi lên giường, tôi sẽ ngủ ngon đến sáng mà không gặp vấn đề gì. 
            Như một đứa trẻ, tôi luôn thức dậy, đầy sảng khoái và không chút mỏi mệt. Lần khám bệnh cuối của 
            tôi cũng cho thấy tôi hoàn toàn khỏe mạnh.
            Tôi đang cố giải thích rằng tôi là một kẻ chỉ muốn ${wish}, 
            không mảy may đến chuyện thắng thua với ai, đặc biệt khi nó làm tôi mất ngủ vào buổi đêm. 
            Đó là cách tôi đương đầu với cái xã hội này, và tôi biết điều đó làm tôi cảm thấy hạnh phúc hơn hết.
            Tuy nhiên, nếu phải chiến đấu với bất kỳ kẻ nào, tôi nhất định sẽ không thua!”`;

            /*Tên tôi là Yoshikage Kira. Năm nay 33 tuổi. Nhà của tôi nằm ở khu Đông Bắc của Morioh, 
            nơi toàn những biệt thự, và tôi chưa kết hôn. Tôi làm nhân viên tại cửa hàng Kame Yu
            và luôn là người về nhà muộn nhất lúc 8 giờ tối. Tôi không hút thuốc, nhưng thỉnh thoảng uống rượu. 
            Tôi đi ngủ lúc 11 giờ tối, luôn đảm bảo ngủ đủ 8 tiếng, dù bất kì chuyện gì đi nữa. Sau khi uống một ly sữa ấm 
            và tập thể dục nhẹ 20 phút trước khi lên giường, tôi sẽ ngủ ngon đến sáng mà không gặp vấn đề gì. 
            Như một đứa trẻ, tôi luôn thức dậy, đầy sảng khoái và không chút mỏi mệt. Lần khám bệnh cuối của 
            tôi cũng cho thấy tôi hoàn toàn khỏe mạnh.
            Tôi đang cố giải thích rằng tôi là một kẻ chỉ muốn sống một cuộc đời bình yên phẳng lặng, 
            không mảy may đến chuyện thắng thua với ai, đặc biệt khi nó làm tôi mất ngủ vào buổi đêm. 
            Đó là cách tôi đương đầu với cái xã hội này, và tôi biết điều đó làm tôi cảm thấy hạnh phúc hơn hết.
            Tuy nhiên, nếu phải chiến đấu với bất kỳ kẻ nào, tôi nhất định sẽ không thua! */
};

generateButton.addEventListener('click', generateResultParagraph);
translateButton.addEventListener('click', () => {translateVN(
    resultParagraph, tName, tAge, tHouse, tIsMarried, tWorktitle, tWorkplace, tTimeGetHome, tTimeToSleep, 
    tNotDo, tDo, tWish)
}); 
