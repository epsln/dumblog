const container = document.getElementById("app");

var clientHeight = document.getElementById('app').clientHeight;
var clientWidth  = document.getElementById('app').clientWidth;
document.getElementById("generate").onclick = () => {
  const tess_type = document.getElementById("tess-type").value;
  const tess_id   = document.getElementById("tess-id").value;
  const scale     = parseInt(document.getElementById("scale").value);
  const angle     = parseFloat(document.getElementById("angle").value);

  const n_sides = parseInt(document.getElementById("p").value);
  const n_neigh = parseInt(document.getElementById("q").value);
  const depth   = parseInt(document.getElementById("depth").value);
  const half_p  = document.getElementById("half-plane").checked;
  const ref_itr = parseInt(document.getElementById("refinements").value);

  const param = document.getElementById("parametrisation").value;

  const ornement     = document.getElementById("ornements").value;
  const bands_width = parseInt(document.getElementById("bands-width").value);

  const hatching      = document.getElementById("hatching").value;
  const cross_hatch   = document.getElementById("crosshatch").value;
  const hatch_spacing = parseInt(document.getElementById("hatch-spacing").value);
  // fetch API...
	fetch("https://mortier-api.onrender.com/tiling", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		//body: JSON.stringify({size: [clientWidth, clientHeight], 
		//											 scale: scale, angle: angle})})
		body: JSON.stringify({tess_type: tess_type, tess_id: tess_id,
													size: [clientWidth, clientHeight], 
													scale: scale, angle: angle,
													n_sides: n_sides, n_neigh: n_neigh, depth: depth, refinements: ref_itr, half_plane: half_p,
													parametrisation: param,
													ornement: ornement, bands_width: bands_width,
													hatching: hatching, cross_hatch: cross_hatch, hatch_spacing: hatch_spacing
														})})
		.then(r => r.text())
		.then(svg => {
			container.innerHTML = svg;
		});

};
const params = document.querySelectorAll(".param");

function updateVisibility() {
  params.forEach(el => {
    let visible = true;
		if (this.checked){
			console.log("FUCK")
		}

    for (const attr of el.attributes) {
      if (!attr.name.startsWith("data-show-")) continue;

      const selectId = attr.name.replace("data-show-", "");
      const select = document.getElementById(selectId);

      if (!select) continue;

      const allowedValues = attr.value.split(",");
      if (!allowedValues.includes(select.value)) {
        visible = false;
        break;
      }
    }

    el.classList.toggle("hidden", !visible);
  });
}
document.querySelectorAll("select").forEach(select => {
  select.addEventListener("change", updateVisibility);
});

document.querySelectorAll("checkbox").forEach(select => {
  select.addEventListener("change", updateVisibility);
});
// initial state
updateVisibility();
