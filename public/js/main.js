const cityName = document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');

const city_name = document.getElementById('city_name');
const temp_real_val = document.getElementById('temp_real_val');
const temp_status = document.getElementById('temp_status');
const datahide = document.querySelector('.middle_layer');

const getInfo = async (event) => {
    event.preventDefault();

    let cityVal = cityName.value;

    if (cityVal === "") {
        city_name.innerText = `Plz write the name before search`;
        datahide.classList.add("data_hide");
    } else {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=c48230e84dbf911f26ebf8fe01507e77`
            const response = await fetch(url);

            const data = await response.json();
            const arrData = [data];

            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            temp_real_val.innerText = arrData[0].main.temp;
            const tempMood = arrData[0].weather[0].main;
            console.log(tempMood);

            //condition to check sunny or cloudy
            if (tempMood == "Sunny") {
                temp_status.innerHTML = "<i class='fas  fa-sun' style='color: #eccc68;'></i>";
            } else if (tempMood == "Clouds") {
                temp_status.innerHTML = "<i class='fas  fa-cloud' style='color: #eef2f5;'></i>";
            } else if (tempMood == "Rain") {
                temp_status.innerHTML = "<i class='fas fa-cloud-showers-heavy style = ' color: #0a1e43;'></i>";
            } else if (tempMood == "Drizzle") {
                temp_status.innerHTML = "<i class='fas fa-cloud-rain' style='color: #32709e;'></i>";
            } else if (tempMood == "Haze") {
                temp_status.innerHTML = "<i class='fas fa-cloud-sun' style='color: #6284ad;'></i>";
            } else {
                temp_status.innerHTML = "<i class='fas  fa-cloud' style='color:#d0deec;'></i>";
            }
            datahide.classList.remove('data_hide');
            cityVal = "";
        } catch {
            cityVal = " ";
            datahide.classList.add("data_hide");
            city_name.innerText = `please enter the proper city name`;
            console.log('please add the proper city name');
        }
    }
}
submitBtn.addEventListener('click', getInfo);