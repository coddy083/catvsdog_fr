const backend_url = "https://dj-backend.shop";
const pet_image_input = document.getElementById("pet_image_input");
const upload_image = document.getElementById("upload_image");
const photo_return = document.getElementById("photo_return");

pet_image_input.addEventListener("change", function (e) {
  const pet_image_preview = document.getElementById("pet_image_preview");
  pet_image_preview.src =
    "https://s3.ap-northeast-2.amazonaws.com/swing2bucket/resource/image/help/310edd67b2021e30ce829f8de52ab7b0.png";
  //   pet_image_preview.src = URL.createObjectURL(e.target.files[0]);
  const file = pet_image_input.files[0];
  pet_image_preview.style.objectFit = "cover";
  const reader = new FileReader();
  reader.addEventListener("load", function () {
    pet_image_preview.src = reader.result;
  }),
    reader.readAsDataURL(file);
  pet_image_preview.style.display = "block";
  upload_image.style.display = "none";
}),
  function (e) {
    e.preventDefault();
  };

upload_image.addEventListener("click", function (e) {
  e.preventDefault();
  pet_image_input.click();
});

photo_return.addEventListener("click", function (e) {
  const pet_image_preview = document.getElementById("pet_image_preview");
  e.preventDefault();
  default_result();
  pet_image_input.value = "";
  pet_image_preview.style.display = "none";
  upload_image.style.display = "block";
}),
  function (e) {
    e.preventDefault();
  };

function default_result(){
  const result_cat = document.getElementById("result_cat");
  const result_dog = document.getElementById("result_dog");

  result_cat.style.display = "none";
  result_dog.style.display = "none";
}

function dogcat_result(pet){
  const result_cat = document.getElementById("result_cat");
  const result_dog = document.getElementById("result_dog");
  switch(pet){
    case "dog":
      result_dog.style.display = "flex";
      break;
    case "cat":
      result_cat.style.display = "flex";
      break;
    default:
      return "알 수 없음";
  }
}

async function photo_upload_submit() {
  const pet_image_preview = document.getElementById("pet_image_preview");
  const file = pet_image_input.files[0];
  const formData = new FormData();
  formData.append("photo", file);

  pet_image_preview.style.objectFit = "contain";
  pet_image_preview.src =
    "https://s3.ap-northeast-2.amazonaws.com/swing2bucket/resource/image/help/310edd67b2021e30ce829f8de52ab7b0.png";
    
  const response = await fetch(backend_url + "/pet/", {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  pet_image_preview.style.display = "none";
  dogcat_result(data.classification)
  // window.location.reload();
}
