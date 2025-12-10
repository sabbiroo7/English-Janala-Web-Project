document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('login-btn').addEventListener("click", function(event) {
        event.preventDefault();
        const pin_number = document.getElementById('password').value;
        const name = document.getElementById("input_name").value;

        if (pin_number === '123456' && name !== '') {
            event.preventDefault();
            document.getElementById('main-page').classList.remove('hidden');
            document.getElementById('login-page').classList.add('hidden');
            document.getElementById('openning_massage').showModal()
            const wordDetails = document.getElementById('openning_modal_container')
            wordDetails.innerHTML=`
    <div class="md:w-100 w-auto">
        <div class="modal-box">
    <div class="hind-siliguri">
    <div class="flex justify-center mb-2"><img class="w-20 h-20" src="assets/green-tik-mark.webp" alt=""></div>
        <h3 class="text-xl font-bold text-center">অভিনন্দন</h3>
        <p class="py-4 text-center">চলুন আজ নতুন কিছু শেখা যাক</p>
    </div>
        <div class="modal-action flex justify-center">
          <form method="dialog">
            <button class="btn bg-[#422AD5] text-white ">OK</button>
          </form>
        </div>
      </div>
    </div>
            `;
        } else if (name === '') {
            alert("You didn't enter your name!!!");
        } else {
            alert("You entered the wrong PIN!!!");
        }

    });
    // Logout Code website 
    document.getElementById('logOut').addEventListener("click", function(event) {
        document.getElementById('main-page').classList.add('hidden');
        document.getElementById('login-page').classList.remove('hidden');
        event.preventDefault();
    });
});




