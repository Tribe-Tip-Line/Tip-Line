var data = {
    "Polaris" : "8883737888",
    "Austria" : "2483685383",
    "Germany" : "490802006110",
    "France" : "33825009907",
    "Turkey" : "90157",
    "Belgium" : "3225116464",
    "Bulgaria" : "359080018676",
    "Czech" : "420222717171",
    "Estonia" : "3726607320",
    "Finland" : "358718763170",
    "Greece" : "302310525149",
    "Hungary" : "36205520",
    "Ireland" : "353800250025",
    "Italy" : "39800290290",
    "Latvia" : "37180002012",
    "Lithuania" : "423880066366",
    "Luxembourg" : "35249976210",
    "Malta" : "35622942000",
    "Netherlands" : "33134481186",
    "Poland" : "226280120",
    "Portugal" : "800202148",
    "Romania" : "0800800678",
    "Slovakia" : "903704784",
    "Slovenia" : "0801722",
    "Spain" : "900191010",
    "Sweden" : "020505050",
    "Swiss" : "0800208020",
    "IOM" : "318000522020",
    "Jamaica" : "8768887768328",
    "Colombia" : "578000522020",
    "DHS" : "18883737888",
    "IACAT" : "631343",
    "Thailand" : "661300",
    "Malaysia" : "2230380008000",
    "Indonesia" : "622157951275"
    };

    for (var key in data) {
        var country = key;
        var number = data[key];

        var badge = document.createElement('ul');
        var form = document.createElement('form');
        var inp = document.createElement('input');
        var outer = document.createElement('div');
        var inner = document.createElement('div');
        var li = document.createElement('li');
        var place = document.createElement('h1');
        place.innerHTML = country;
        inner.class = 'item-inner';
        outer.class = 'item-content';
        inp.type = "button";
        inp.value = number;
        inp.setAttribute("id", number);
        inp.onclick = function() {
            callPressed(this.id);
        };
        form.appendChild(inp);
        form.appendChild(place);
        inner.appendChild(form);
        outer.appendChild(inner);
        li.appendChild(outer);
        badge.appendChild(li);
        document.getElementById("number-list").appendChild(badge);
    }

/*
    <li>
    <div class="item-content">
    <div class="item-inner">
<form>
<input type="button" value="888-373-7888" onclick="callPressed(value)" />
    <a>Polaris</a>
    </form>
    </div>
    </div></li>
    */