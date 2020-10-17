const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');


const count = document.getElementById('count');
const total = document.getElementById('total');

const movieSelect = document.getElementById('movie');
let ticketPrice = +movieSelect.value;

populateUI();
//Getdata from localstorage and populate UI
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    console.log(selectedSeats,"selectedSeats")

    if(selectedSeats && selectedSeats.length> 0){
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected')
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }

}
//save selected movie Index
const setMovieDate = (movieIndex, moviePrice) => {
    localStorage.setItem('selectedMovieIndex',movieIndex);
    localStorage.setItem('selectedMoviePrice',moviePrice);
}
const updateSelectedCount = () => {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectedSeatsCount = selectedSeats.length;

    const selectedIndex = [...selectedSeats].map(seat => {
        return [...seats].indexOf(seat);
    })
    localStorage.setItem('selectedSeats',JSON.stringify(selectedIndex));
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount*ticketPrice;

}

//movie select event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieDate(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
})

//seat click event
container.addEventListener('click', (e) => {
    if(e.target.classList.contains("seat") && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected')
        updateSelectedCount();
    }
})

//Initial Count and total set
updateSelectedCount();
