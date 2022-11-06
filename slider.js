
const battery =
  [{
    "batteryName": "WKL-78",
    "capacityAh": 2.3,
    "voltage": 14.4,
    "maxDraw": 3.2,
    "endVoltage": 10,
  },
  {
    "batteryName": "WKL-140",
    "capacityAh": 4.5,
    "voltage": 14.4,
    "maxDraw": 9.2,
    "endVoltage": 5,
  },
  {
    "batteryName": "Wmacro-78",
    "capacityAh": 2.5,
    "voltage": 14.5,
    "maxDraw": 10,
    "endVoltage": 5,
  },
  {
    "batteryName": "Wmacro-140",
    "capacityAh": 3.6,
    "voltage": 14.4,
    "maxDraw": 14,
    "endVoltage": 5,
  },
  {
    "batteryName": "IOP-E78",
    "capacityAh": 6.6,
    "voltage": 14.4,
    "maxDraw": 10.5,
    "endVoltage": 8,
  },
  {
    "batteryName": "IOP-E140",
    "capacityAh": 9.9,
    "voltage": 14.4,
    "maxDraw": 14,
    "endVoltage": 10,
  },
  {
    "batteryName": "IOP-E188",
    "capacityAh": 13.2,
    "voltage": 14.4,
    "maxDraw": 14,
    "endVoltage": 11,
  },
  {
    "batteryName": "RYN-C65",
    "capacityAh": 4.9,
    "voltage": 14.8,
    "maxDraw": 4.9,
    "endVoltage": 11,
  },
  {
    "batteryName": "RYN-C85",
    "capacityAh": 6.3,
    "voltage": 14.4,
    "maxDraw": 6.3,
    "endVoltage": 12,
  },
  {
    "batteryName": "RYN-C140",
    "capacityAh": 9.8,
    "voltage": 14.8,
    "maxDraw": 10,
    "endVoltage": 12,
  },
  {
    "batteryName": "RYN-C290",
    "capacityAh": 19.8,
    "voltage": 14.4,
    "maxDraw": 14,
    "endVoltage": 12,
  }]
  ;

const camera =
  [{
    "brand": "Cakon",
    "model": "ABC 3000M",
    "powerConsumptionWh": 35.5,
  },
  {
    "brand": "Cakon",
    "model": "ABC 5000M",
    "powerConsumptionWh": 37.2,
  },
  {
    "brand": "Cakon",
    "model": "ABC 7000M",
    "powerConsumptionWh": 39.7,
  },
  {
    "brand": "Cakon",
    "model": "ABC 9000M",
    "powerConsumptionWh": 10.9,
  },
  {
    "brand": "Cakon",
    "model": "ABC 9900M",
    "powerConsumptionWh": 15.7,
  },
  {
    "brand": "Go MN",
    "model": "UIK 110C",
    "powerConsumptionWh": 62.3,
  },
  {
    "brand": "Go MN",
    "model": "UIK 210C",
    "powerConsumptionWh": 64.3,
  },
  {
    "brand": "Go MN",
    "model": "UIK 230C",
    "powerConsumptionWh": 26.3,
  },
  {
    "brand": "Go MN",
    "model": "UIK 250C",
    "powerConsumptionWh": 15.3,
  },
  {
    "brand": "Go MN",
    "model": "UIK 270C",
    "powerConsumptionWh": 20.3,
  },
  {
    "brand": "VANY",
    "model": "CEV 1100P",
    "powerConsumptionWh": 22,
  },
  {
    "brand": "VANY",
    "model": "CEV 1300P",
    "powerConsumptionWh": 23,
  },
  {
    "brand": "VANY",
    "model": "CEV 1500P",
    "powerConsumptionWh": 24,
  },
  {
    "brand": "VANY",
    "model": "CEV 1700P",
    "powerConsumptionWh": 25,
  },
  {
    "brand": "VANY",
    "model": "CEV 1900P",
    "powerConsumptionWh": 26,
  }]
  ;

//config設定
const config = {
  brand: "",
  model: "",
  power: 0,
};

/**
 * View
 */
class View {
  static createHtml() {
    const target = document.getElementById("target");
    target.innerHTML = `
			<div class="step">
				<p class="step-num">step1: Select your brand</p>
				<select id="brand" class="input"></select>
			</div>
			<div class="step">
				<p class="step-num">step2: Select your Model</p>
				<select id="model"class="input"></select>
			</div>
			<div class="step">
				<p class="step-num">step3: Input Accessory Power Consumption</p>
				<input id="power" class="input" type="number" min="0" max="100" value="0"/> W
			</div>
			<div class="step">
				<p class="step-num">step4: Choose Your Battery</p>
				<div id="battery"></div>
			</div>
		`;
    this.createOptions();
  }
  static createOptions() {
    const brandSelect = document.getElementById("brand");
    const modelSelect = document.getElementById("model");
    const powerInput = document.getElementById("power");
    brandSelect.addEventListener("change", Controller.selectChange);
    modelSelect.addEventListener("change", Controller.selectChange);
    powerInput.addEventListener("change", Controller.selectChange);

    this.brandKinds().forEach((brand, i) => {
      const option = document.createElement("option");
      option.setAttribute("id", i);//idをiにset
      option.setAttribute("value", brand);//valueをbrandにset
      option.innerHTML = `${brand}`;//brandを取得
      brandSelect.append(option);//step1にappend
    });

    Controller.model(brandSelect.value);
    Controller.selectChange();
  }
  static brandKinds() {
    const brandArr = [];
    camera.forEach((one) => {
      if (brandArr.includes(one.brand)) return false;//brandを重複させない
      brandArr.push(one.brand);
    });
    return brandArr;
  }
}

/**
 * Controller * filter
 */
class Controller {
  static selectChange(e = null) {
    const brandSelect = document.getElementById("brand");
    const modelSelect = document.getElementById("model");
    const powerInput = document.getElementById("power");
    if (e) {
      switch (e.target.id) {
        case "brand":
          config.brand = e.target.value;
          Controller.model(brandSelect.value);
          break;
        case "model":
          config.model = e.target.model;
          break;
        case "power":
          let inputPower = e.target.value;
          if (inputPower < 0) inputPower = 0;
          else if (inputPower > 100) inputPower = 100;
          powerInput.value = inputPower;
          config.power = inputPower;
          break;
      }
    }

    config.brand = brandSelect.value;
    config.model = modelSelect.value;
    config.power = powerInput.value;

    const selectedCamera = Controller.camera(config.brand, config.model);
    Controller.battery(selectedCamera[0].powerConsumptionWh, config.power);
    console.log(selectedCamera);
    console.log(config);
  }
  static camera(selectedBrand, selectedModel) {
    const selectedCamera = camera.filter((one) => {
      return one.brand === selectedBrand && one.model === selectedModel;
    });
    return selectedCamera;
  }
  static model(selectedBrand) {
    //model選択
    const modelSelect = document.getElementById("model");
    modelSelect.innerHTML = ``;
    camera
      .filter((one) => {
        return one.brand === selectedBrand;
      })
      .forEach((one, i) => {
        console.log(i);
        const option = document.createElement("option");
        option.setAttribute("id", i);
        option.setAttribute("value", one.model);
        option.innerHTML = `${one.model}`;
        modelSelect.append(option);
      });
  }
  static battery(cameraPowerC, accessoryPowerC) {
    //battery表示
    const totalPowerC = Number(cameraPowerC) + Number(accessoryPowerC);
    const batteryList = document.getElementById("battery");
    batteryList.innerHTML = ``;
    battery
      .filter((one) => {
        return Battery.isSafeDischargePower(
          one.maxDraw,
          one.endVoltage,
          totalPowerC
        );
      })
      .sort((a, b) => {
        return a.batteryName < b.batteryName ? -1 : 1;
      })
      .forEach((one) => {
        const list = document.createElement("div");
        list.innerHTML = `
				<div class="d-flex justify-content-between mb-2 battery-one">
					<div>${one.batteryName}</div>
					<div>Estimate ${Battery.usableTime(
          one.capacityAh * one.voltage,
          totalPowerC
        )} hours</div>
				</div>`;
        batteryList.append(list);
      });
  }
}

class Battery {
  static usableTime(batteryPowerC, totalPowerC) {
    return (Math.round((10 * batteryPowerC) / totalPowerC) / 10).toFixed(1);
  }
  static isSafeDischargePower(maxDraw, endVoltage, totalPowerC) {
    return maxDraw * endVoltage > totalPowerC;
  }
}

View.createHtml();
