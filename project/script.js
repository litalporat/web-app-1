let ads = [];
fetch("/data")
  .then((data) => {
    return data.json();
  })
  .then((res) => {
    console.log(res);
    ads = res;
    let currentAd = -1;
    let changeOnTime;

    //returns t/f if ad in time to show
    const timeFrame = function (currDates) {
      const now = new Date();
      window.lital = currDates;
      window.ravid = now
      //dates check
      if (
        new Date(currDates.range[0]) <= Date.now() &&
        new Date(currDates.range[1]) >= Date.now()
      ) {
        //days of the week check
        if (
          Object.keys(currDates.daysAndHours).includes(now.getDay().toString())
        ) {
          //hours check
          if (
            currDates.daysAndHours[now.getDay()][0] <= now.getHours() &&
            currDates.daysAndHours[now.getDay()][1] >= now.getHours()
          ) {
            return true;
          }
        }
      }
      return false;
    };

    //handle button click
    $("#btn_load_next").click(function () {
      clearTimeout(changeOnTime);
      nextAd();
    });

    //switch the current ad to next ad
    const nextAd = () => {
      if (adsToShow()) {
        do {
          currentAd++;
          currentAd = currentAd % ads.length;
        } while (!timeFrame(ads[currentAd].dates));
        appendAd();
      } else
        $('#result').html("No ads to show at the moment...")
    };

    const adsToShow = () => {
      for (let i = 0; i < ads.length; i++) {
        if (timeFrame(ads[i].dates))
          return true
      }
      return false;
    }

    //shows on screen
    const appendAd = () => {
      const template = "./" + ads[currentAd].template + ".html";

      $("#result").load(template, function () {
        $("#title").html(ads[currentAd].title);
        $("#subtitle").html(ads[currentAd].subtitle);

        if (ads[currentAd].template == "b") {
          $("#text").html(ads[currentAd].message[0] + "<p></p>");
          $("#title2").html(ads[currentAd].title);
          $("#subtitle2").html(ads[currentAd].subtitle);
          $("#text2").html(ads[currentAd].message[1] + "<p></p>");
          $("#title3").html(ads[currentAd].title);
          $("#subtitle3").html(ads[currentAd].subtitle);
          $("#text3").html(ads[currentAd].message[2] + "<p></p>");
        } else {
          $("#text").html(ads[currentAd].message.join("<p></p>"));
        }

        ads[currentAd].img.forEach(function (image, i) {
          const currImg = "#image-" + (i + 1);
          $(currImg).attr("src", image);
        });
      });

      changeOnTime = setTimeout(function () {
        nextAd();
      }, ads[currentAd].ttl);
    };

    //the first ad to show
    $(document).ready(nextAd);
  });
