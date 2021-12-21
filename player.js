
var Player = {

	"save": {
		
		"x": 55, //55
		"y": 15, //15
		"hp": 10, //10
		"maxhp": 10, //10
		"xp": 0, //0
		"gold": 0, //0
		"regenTimeout": 3000, //3000
		"regenHp": 1, //1
		"spawn2": false,
		
		"punchesLeft": 10, //10
		"meditateHpLeft": 500, //500
		"hasReadLiterature3": false, //false
		"tookPizzas": false, //false
		"hasLoan": false, //false
		"devAway": true, //true
		"hasSmartphone": false, //false
		"killsToRun": 0, //0
		"lastEnemy": [], //[]
		
		"weapon": "fists", //fists
		"head": "none", //none
		"body": "none", //none
		
		"inventory": {
			"weapon": ["fists"], //["fists"]
			"head": ["none"], //["none"]
			"body": ["none"], //["none"]
			"item": {
				"apple": 0, //0
				"heart": 0, //0
				"s_heart": 0, //0
				"pizza": 0, //0
				"dragon-corpse": 0, //0
				"gun": 0, //0
				"cookie": 0, //0
			},
			"thing": {
				"teleporter": false //false
			}
		},
		
	},
	
	"heart": 7, //7
	"initialHp": 0, //0
	"isStunned": false, //false
	"meditating": false, //false
	
	"items": {
		
		"apple": {
			"name": "apple",
			"image": "1f34e",
			"description": "Eating an apple heals you during a battle. Can't eat them while attacking though.",
		},
		
		"heart": {
			"name": "blue heart",
			"image": "1f499",
			"description": "This heart increases your max hp by 400 and changes your respawn point. Your max hp won't decrease if you don't have the heart anymore.",
		},
		
		"s_heart": {
			"name": "shiny heart",
			"image": "1f496",
			"description": "This shiny heart makes you heal faster when you are not in a battle. The effect of this heart persists even after you don't have it anymore.",
			//originally these hearts are dropped by dragons, but I changed it so the ghosts drop them instead
		},
		
		"pizza": {
			"name": "pizza",
			"image": "1f355",
			"description": "These pizzas look and smell delicious, unfortunately you can't enjoy their gloriousness.",
		},
		
		"dragon-corpse": {
			"name": "dragon corpse",
			"image": "1f409",
			"description": "Dragon skins are too precious to throw, maybe you will find them useful later.",
		},
		
		"gun": {
			"name": "infinity gun",
			"image": "1f52b",
			"description": "This gun deals infinite damage, but you can only have one of them at a time and the gun will break after one usage.",
		},
		
		"cookie": {
			"name": "Cookie",
			"image": "1f36a",
			"description": "Congratulations for finishing the game! Cookies increase your attack damage (although the number of damage shown won't change).",
		}
		
	},
	
	move: function(x,y,param) {
	
		if(UI.getDialogOpen()=="none" || param!=='undefined') {
		
			Game.display.draw(Player.save.x, Player.save.y, " ");
			Player.save.x = x;
			Player.save.y = y;
			
			var top = Player.save.y-Game.screenheight/2;
			var bottom = Player.save.y+Game.screenheight/2;
			var left = Player.save.x-Game.screenwidth/2;
			var right = Player.save.x+Game.screenwidth/2;
			
			if(Math.random()<.5) {
				var spawnx = Math.round(Math.random()*(right-left))+left;
				var spawny = Math.random()<.5?top-1:bottom+1;
			}
			else {
				var spawnx = Math.random()<.5?left-1:right+1;
				var spawny = Math.round(Math.random()*(bottom-top))+top;
			}
			
			var spawnChance = .05;
			
			if(Game.getEntityCount("mouse")<11 && Math.random()<spawnChance) {
				if(Game.getTile(spawnx,spawny)===undefined && Game.getEntity(spawnx,spawny)===undefined && spawny>0 && spawny<60 && spawnx>0 && spawnx<Game.mapwidth)Game.addEnemy(spawnx,spawny,"mouse");	
			}
			
			if(Game.getEntityCount("rat")<11 && Math.random()<spawnChance) {
				if(Game.getTile(spawnx,spawny)===undefined && Game.getEntity(spawnx,spawny)===undefined && spawny>0 && spawny<60 && spawnx>0 && spawnx<Game.mapwidth)Game.addEnemy(spawnx,spawny,"rat");
			}
			
			if(Game.getEntityCount("camel1")<11 && Math.random()<spawnChance) {
				if(Game.getTile(spawnx,spawny)===undefined && Game.getEntity(spawnx,spawny)===undefined && spawny>60 && spawny<90 && spawnx>0 && spawnx<Game.mapwidth)Game.addEnemy(spawnx,spawny,"camel1");	
			}
			
			if(Game.getEntityCount("camel2")<11 && Math.random()<spawnChance) {
				if(Game.getTile(spawnx,spawny)===undefined && Game.getEntity(spawnx,spawny)===undefined && spawny>60 && spawny<90 && spawnx>0 && spawnx<Game.mapwidth)Game.addEnemy(spawnx,spawny,"camel2");
			}
			
			if(Game.getEntityCount("snake")<11 && Math.random()<spawnChance) {
				if(Game.getTile(spawnx,spawny)===undefined && Game.getEntity(spawnx,spawny)===undefined && spawny>113 && spawny<150 && spawnx>20 && spawnx<Game.mapwidth)Game.addEnemy(spawnx,spawny,"snake");
			}
			
			if(Game.getEntityCount("goat")<11 && Math.random()<spawnChance) {
				if(Game.getTile(spawnx,spawny)===undefined && Game.getEntity(spawnx,spawny)===undefined && spawny>113 && spawny<150 && spawnx>20 && spawnx<Game.mapwidth)Game.addEnemy(spawnx,spawny,"goat");
			}
			
			if(Game.getEntityCount("dragon")<11 && Math.random()<spawnChance) {
				if(Game.getTile(spawnx,spawny)===undefined && Game.getEntity(spawnx,spawny)===undefined && spawny>191 && spawny<250 && spawnx>0 && spawnx<Game.mapwidth)Game.addEnemy(spawnx,spawny,"dragon");
			}
			
			if(Game.getEntityCount("ghost")<11 && Math.random()<spawnChance) {
				if(Game.getTile(spawnx,spawny)===undefined && Game.getEntity(spawnx,spawny)===undefined && spawny>191 && spawny<250 && spawnx>0 && spawnx<Game.mapwidth)Game.addEnemy(spawnx,spawny,"ghost");
			}
			
			if(Game.getEntityCount("alien2")<21 && Math.random()<spawnChance) {
				if(Game.getTile(spawnx,spawny)===undefined && Game.getEntity(spawnx,spawny)===undefined && spawny>270 && spawny<350 && spawnx>0 && spawnx<Game.mapwidth)Game.addEnemy(spawnx,spawny,"alien2");
			}
			
			Game.drawTiles();
			UI.update();
			
		}
		
	},
	
	interact: function(x,y,type) {
		if(UI.getDialogOpen()=="none") {
			type = typeof type !== 'undefined' ? type : "t";
			if(type=="t") {
				var tile = Game.getTile(x,y).c;
				if(tile=="S") {
					UI.showAlert('shop');
				}
				else if(tile=="P") {
					if(x==50 && y==13)UI.chat('penguin');
					else if(x==48 && y==260)UI.chat('penguin2');
				}
				else if(tile=="C") {
					if(Player.save.hp>0) {
						Player.save.hp--;
						if(Player.save.hp==0) {
							UI.addLog("You are killed by a cactus.");
							Player.respawn();
						}
						else {
							UI.addLog("Ouch! Cactus hurts!");
							UI.update();
						}
						UI.redEffect();
					}
					else {
						Player.respawn();
					}
				}
				else if(tile=="T") {
					UI.chat("turtle");
				}
				else if(tile=="F") {
					document.getElementById("sharpen-scissors-gold").innerHTML = tools.num(tools.scissorsSharpenPrice(Battle.getWeaponInfo("scissors").damage));
					document.getElementById("sharpen-knife-gold").innerHTML = tools.num(tools.knifeSharpenPrice(Battle.getWeaponInfo("knife").damage));
					UI.showAlert('forge');
				}
				else if(tile=="TC") {
					UI.showAlert('training');
				}
				else if(tile=="L") {
					UI.addLog("You died swimming in lava.");
					UI.redEffect();
					Player.respawn();
				}
				else if(tile=="FI") {
					if(Player.save.hp>0) {
						Player.save.hp-=10;
						if(Player.save.hp==0) {
							UI.addLog("You died burning.");
							Player.respawn();
						}
						else {
							UI.addLog("Fire is hot!");
							UI.update();
						}
						UI.redEffect();
					}
					else {
						Player.respawn();
					}
				}
				else if(tile=="PR") {
					if(!Game.snakeActivated && y==169){
						UI.addLog("You activated a pressure plate.");
						Game.snakeActivated = true;
						var i = 0;
						var interval = setInterval(function() {
							if(i>=5) {
								var x = Game.snake[i-5].x;
								var y = Game.snake[i-5].y;
								Game.addTile(x,y,false,"L");
								if(Player.save.x==x && Player.save.y==y) Player.interact(x,y);
							}
							if(i<Game.snake.length)Game.addBlank(Game.snake[i].x,Game.snake[i].y);
							Game.drawTiles();
							i++;
							if(i-5==Game.snake.length)clearInterval(interval), Game.snakeActivated = false;
						}, 220);
					}
					else if(y==186 && !Game.save.pathActivated){
						UI.addLog("You activated another pressure plate.");
						for(j=170;j<=185;j++) {
							Game.addBlank(x-1,j);
							Game.addBlank(x,j);
							Game.addBlank(x+1,j);
						}
						Game.drawTiles();
						Game.save.pathActivated = true;
					}
				}
				else if(tile=="MS") {
					UI.showAlert('ms-shop');
				}
				else if(tile=="B1" || tile=="B2") {
					document.getElementById("give-pizza").style.display = "none";
					document.getElementById("enter-portal").style.display = "none";
					if(!Player.save.hasLoan) {
						if(tools.arrayContains(Game.save.happyPizzaCustomers,tools.arrayIndex(Game.pizzaCustomers,x+","+y))) {
							document.getElementById("house-content").innerHTML = "Thanks for the pizza!";
						}
						else if(tools.arrayContains(Game.pizzaCustomers,x+","+y) && Player.numItems("pizza")>0) {
							if(tools.arrayIndex(Game.pizzaCustomers,x+","+y)==9) {
								if(Game.save.happyPizzaCustomers.length<9) {
									document.getElementById("house-content").innerHTML = "In front of the house there's a message:<br><span style=\"font-family:monospace;\">If you are the pizza deliverer, please send everyone else's pizzas first then send me the last one.</span>";
								}
								else {
									document.getElementById("house-content").innerHTML = "You knocked the door without receiving any replies. You tried to open the door and shockingly the door is not locked. Nobody is inside, but you found a portal with a sign that says: \"To the Negative Zone\".";
									document.getElementById("enter-portal").style.display = "block";
								}
							}
							else {
								document.getElementById("house-content").innerHTML = "Hey! Pizzas! I have been waiting for you!";
								document.getElementById("give-pizza").addEventListener("click", function(){Player.givePizza(x,y)});
								document.getElementById("give-pizza").style.display = "block";
							}
						}
						else {
							document.getElementById("house-content").innerHTML = "It looks like this house is locked. You knock the door but there are no replies. Probably the owner is away.";
						}
					}
					else {
						document.getElementById("house-content").innerHTML = "It looks like you have an unpaid loan, you can't visit houses until you pay your loan.";
					}
					UI.showAlert('locked-house');
				}
				else if(tile=="B4") {
					UI.showAlert('store');
				}
				else if(tile=="TP") {
					if(x==50 && y==115) Player.move(50,262);
					else if(x==-200 && y==-201) Player.move(50,262);
					else if(x==50 && y==263) Player.move(50,116);
				}
				else if(tile=="B3") {
					UI.showAlert('museum');
				}
				else if(tile=="B5") {
					if(Player.save.hasReadLiterature3) {
						document.getElementById("no-knowledge").style.display = "none";
						document.getElementById("has-knowledge").style.display = "block";
					}
					UI.showAlert('temple');
				}
				else if(tile=="B6") {
					if(Player.save.hasLoan) {
						document.getElementById("available-loans").style.display = "none";
						document.getElementById("pay-loan").style.display = "block";
					}
					else {
						document.getElementById("available-loans").style.display = "block";
						document.getElementById("pay-loan").style.display = "none";
					}
					UI.showAlert('bank');
				}
			}
			else if(type=="e") {
				if(Battle.getEnemyInfo(Game.getEntity(x,y).name) !== undefined) {
					Battle.engage(x,y);
				}
				else if(Game.getEntityAscii(x,y)=="PA") {
					Player.takePackage(x,y);
				}
				else if(Game.getEntityAscii(x,y)=="SH") {
					Player.takeItem("s_heart",x,y);
				}
			}
		}
	},
	
	getInventory: function() {
		return Player.save.inventory;
	},
	
	getWeapon: function() {
		return Player.save.weapon;
	},
	
	getItemInfo: function(name) {
		return Player.items[name];
	},
	
	setWeapon: function(name) {
		Player.save.weapon = name;
		UI.toggleOption('weapon');
		UI.update();
	},
	
	setHead: function(name) {
		Player.save.head = name;
		UI.toggleOption('head');
		UI.update();
	},
	
	setBody: function(name) {
		Player.save.body = name;
		UI.toggleOption('body');
		UI.update();
	},
	
	buy: function(item) {
		if(item=="scissors" && !tools.arrayContains(Player.save.inventory.weapon,"scissors")) {
			if(Player.save.gold>=5) {
				Player.save.gold -= 5;
				Player.save.inventory.weapon.push("scissors");
				UI.addLog("You bought scissors for <b>5</b> gold.");
			}
			else { alert('金币不够！'); }
		}
		else if(item=="knife") {
			if(Player.save.gold>=17) {
				Player.save.gold -= 17;
				Player.save.inventory.weapon.push("knife");
				UI.addLog("You bought a knife for <b>17</b> gold.");
			}
			else { alert('金币不够！'); }
		}
		else if(item=="apple") {
			if(Player.save.gold>=50) {
				Player.save.gold -= 50;
				Player.save.inventory.item.apple++;
				UI.addLog("You bought an apple for <b>50</b> gold.");
			}
			else { alert('金币不够！'); }
		}
		else if(item=="apple-10") {
			if(Player.save.gold>=475) {
				Player.save.gold -= 475;
				Player.save.inventory.item.apple+=10;
				UI.addLog("You bought 10 apples for <b>475</b> gold.");
			}
			else { alert('金币不够！'); }
		}
		else if(item=="headphones") {
			if(Player.save.gold>=50) {
				Player.save.gold -= 50;
				Player.save.inventory.head.push("headphones");
				UI.addLog("You bought a pair of headphones for <b>50</b> gold.");
			}
			else { alert('金币不够！'); }
		}
		else if(item=="magic-hat") {
			if(Player.save.gold>=750) {
				Player.save.gold -= 750;
				Player.save.inventory.head.push("magic-hat");
				UI.addLog("You bought a magic hat for <b>750</b> gold.");
			}
			else { alert('金币不够！'); }
		}
		else if(item=="heart-armor") {
			if(Player.save.gold>=100000) {
				Player.save.gold -= 100000;
				Player.save.inventory.body.push("heart-armor");
				UI.addLog("You bought a heart armor for <b>100,000</b> gold.");
			}
			else { alert('金币不够！'); }
		}
		else if(item=="teleporter" && !Player.save.inventory.thing.teleporter) {
			if(Player.save.gold>=50000) {
				Player.save.gold -= 50000;
				Player.save.inventory.thing.teleporter = true;
				UI.addLog("You bought teleport machine for <b>50,000</b> gold.");
				Game.addTile(50,115,true,"TP");
				Game.addTile(50,263,true,"TP");
			}
			else { alert('金币不够！'); }
		}
		else if(item=="blue-heart") {
			if(Player.save.gold>=100000) {
				Player.save.gold -= 100000;
				Player.addItem("heart",1);
				Player.save.hp += 400;
				Player.save.maxhp += 400;
				UI.addLog("Your bought a blue heart for <b>100,000</b> gold.");
				Player.save.spawn2 = true;
			}
			else { alert('金币不够！'); }
		}
		else if(item=="smartphone") {
			if(Player.save.gold>=10000000) {
				Player.save.gold -= 10000000;
				Player.save.hasSmartphone = true;
				UI.addLog("You bought a smartphone for <b>10,000,000</b> gold.");
			}
			else { alert('金币不够！'); }
		}
		UI.update();
	},
	
	addItem: function(name,num) {
		Player.save.inventory.item[name] += num;
		UI.update();
	},
	
	setItem: function(name,num) {
		Player.save.inventory.item[name] = num;
		UI.update();
	},
	
	addThing: function(name,num) {
		Player.save.inventory.thing[name] += num;
		UI.update();
	},
	
	numItems: function(name) {
		return Player.save.inventory.item[name];
	},
	
	numThings: function(name) {
		return Player.save.inventory.thing[name];
	},
	
	removeItem: function(name,num) {
		Player.save.inventory.item[name] -= num;
		UI.update();
	},
	
	regen: function() {
		if(Battle.ongoing=="none" && Player.save.hp<Player.save.maxhp) {
			Player.save.hp += Math.round(Player.save.regenHp);
			if(Player.save.hp>Player.save.maxhp)Player.save.hp = Player.save.maxhp;
			UI.update();
		}
		setTimeout("Player.regen()",Player.save.regenTimeout)
	},
	
	respawn: function() {
		Player.save.hp = Player.save.maxhp;
		if(Player.save.inventory.item.heart>=1 || Player.save.spawn2) {
			Player.save.x = 50;
			Player.save.y = 117;
		}
		else {
			Player.save.x = 55;
			Player.save.y = 15;
		}
		Game.drawTiles();
		UI.update();
	},
	
	training: function(what) {
		if(what=="punch") {
			Player.save.punchesLeft--;
			if(Player.save.punchesLeft<=0) {
				var damage = Battle.getWeaponInfo("fists").damage;
				Battle.setWeaponInfo("fists","damage",damage+1);
				UI.addLog("Now your fists deal <b>"+(damage+1)+"</b> damage.");
				UI.update();
				Player.save.punchesLeft = (damage+2)*5;
			}
			document.getElementById("punches-left").innerHTML = tools.num(Player.save.punchesLeft)+" punches left to increase damage";
		}
		else if(what=="start-meditate") {
			UI.hideAlertFast();
			UI.showAlert("meditate");
			Player.meditating = true;
			Player.meditate(4);
		}
		else if(what=="stop-meditate") {
			UI.hideAlert();
			Player.meditating = false;
		}
	},
	
	meditate: function(timeLeft) {
		if(Player.meditating) {
			if(Player.save.meditateHpLeft>0) {
				timeLeft--;
				if(timeLeft<=0) {
					Player.save.maxhp++;
					Player.save.meditateHpLeft--;
					UI.addLog("Now you have <b>"+tools.num(Player.save.maxhp)+"</b> max hp.");
					UI.update();
					timeLeft = 3;
				}
				document.getElementById("meditate-content").innerHTML = timeLeft+" seconds left to increase max hp.";
				setTimeout(function(){Player.meditate(timeLeft);}, 1000);
			}
			else {
				document.getElementById("meditate-content").innerHTML = "It seems that you have meditated too much, you can't increase max hp by meditating anymore.";
			}
		}
	},
	
	forge: function(what) {
		if(what=="scissors") {
			var damage = Battle.getWeaponInfo("scissors").damage;
			if(Player.save.gold>=tools.scissorsSharpenPrice(damage)) {
				Player.save.gold-=tools.scissorsSharpenPrice(damage);
				var totalDmg = 0;
				if(damage<50)totalDmg = 50;
				else totalDmg = damage+50;
				Battle.setWeaponInfo("scissors","damage",totalDmg);
				document.getElementById("sharpen-scissors-gold").innerHTML = tools.num(tools.scissorsSharpenPrice(totalDmg));
				UI.addLog("Your scissors now deal <b>"+tools.num(totalDmg)+"</b> damage.");
				UI.update();
			}
			else { alert('金币不够！'); }
		}
		else if(what=="knife") {
			var damage = Battle.getWeaponInfo("knife").damage;
			if(Player.save.gold>=tools.knifeSharpenPrice(damage)) {
				Player.save.gold-=tools.knifeSharpenPrice(damage);
				var totalDmg = 0;
				if(damage<5000)totalDmg = 5000;
				else totalDmg = damage+5000;
				Battle.setWeaponInfo("knife","damage",totalDmg);
				document.getElementById("sharpen-knife-gold").innerHTML = tools.num(tools.knifeSharpenPrice(totalDmg));
				UI.addLog("Your knife now deals <b>"+tools.num(totalDmg)+"</b> damage.");
				UI.update();
			}
			else { alert('金币不够！'); }
		}
	},
	
	takePackage: function(x,y) {
	
		var html="";
		document.getElementById("package-take").style.display = "block";
		document.getElementById("package-take").innerHTML = "TAKE ITEM";
		
		if(x==0 && y==116) {
			html = "This package contains a blue heart!";
			document.getElementById("package-take").addEventListener("click", function(){Player.takeItem("heart",x,y)});
		}
		else if(x==25 && y==42) {
			html = "This package contains a blue heart!";
			document.getElementById("package-take").addEventListener("click", function(){Player.takeItem("heart",x,y)});
		}
		else if(y==188) {
			html = "这个箱子包含一个神秘的消息：<br><br><div style='font-family:monospace;padding-left:30px;'>(25, 42) 有一个礼物在等着你.<br><div style='text-align:right;padding-right:30px;'>真诚的, (48, 260)</div></div>";
			document.getElementById("package-take").style.display = "none";
		}
		else if(x==52 && y==260) {
			var customers = [];
			for(i=0;i<Game.pizzaCustomers.length;i+=2) {
				var customer = Game.pizzaCustomers[i].split(",");
				var customer2 = Game.pizzaCustomers[i+1].split(",");
				//var numspaces = 16 - (customer[0]+", "+customer[1]).length;
				var spaces = Array(10).join("&nbsp;");
				customers.push(customer[0]+", "+customer[1]+spaces+customer2[0]+", "+customer2[1]);
			}
			var message = "<div style='font-family:monospace;padding:30px;'>List of customers:<br>"+customers.join("<br>")+"</div>";
			if(!Player.save.tookPizzas) {
				html = "This package contains 10 pizzas and a message:"+message+"Open settings to show player coordinates.";
				document.getElementById("package-take").innerHTML = "TAKE PIZZAS";
				document.getElementById("package-take").addEventListener("click", function(){Player.takeItem("pizzas",x,y)});
			}
			else {
				html = "这个箱子包含一条消息："+message+"打开设置以显示玩家坐标。";
				document.getElementById("package-take").style.display = "none";
			}
		}
		else if(x>=5 && y>=5 && x<=95 && y<=50) {
			html = "This package contains 1 xp. There are 10 similar packages in this area, find them all!";
			document.getElementById("package-take").addEventListener("click", function(){Player.takeItem("xp",x,y)});
		}
		else {
			html = "This package contains nothing :(";
			document.getElementById("package-take").innerHTML = "REMOVE PACKAGE";
			document.getElementById("package-take").addEventListener("click", function(){Player.takeItem("none",x,y)});
		}
		
		document.getElementById("package-content").innerHTML = html;
		UI.showAlert('package');
		
	},
	
	takeItem: function(what,x,y) {
	
		document.getElementById("package-take").style.display = "none";
	
		if(what=="heart") {
			Game.removeEntity(x,y);
			Player.addItem("heart", 1);
			Player.save.hp += 400;
			Player.save.maxhp += 400;
			Player.save.spawn2 = true;
			UI.addLog("Your took a blue heart.");
			UI.hideAlert();
		}
		else if(what=="s_heart") {
			Game.removeEntity(x,y);
			Player.addItem("s_heart", 1);
			if(Player.save.regenTimeout>0)Player.save.regenTimeout -= 100;
			else Player.save.regenHp++;
			UI.addLog("Your took a shiny heart.");
			Player.move(x,y);
		}
		else if(what=="pizzas") {
			if(!Player.save.tookPizzas) {
				Player.addItem("pizza", 10);
				UI.addLog("Your took <b>10</b> pizzas.");
				Player.save.tookPizzas = true;
				UI.hideAlert();
			}
		}
		else if(what=="xp") {
			Game.removeEntity(x,y);
			var oldLevel = Player.getLevel();
			Player.save.xp += 1;
			UI.addLog("Your got <b>1</b> xp.");
			UI.hideAlert();
			if(Player.getLevel() > oldLevel) UI.addLog("Level up! Check the sidebar to see your new ability.");
		}
		else if(what=="none") {
			Game.removeEntity(x,y);
			UI.hideAlert();
		}
		
		UI.update();
		
	},
	
	givePizza: function(x,y) {
		var index = tools.arrayIndex(Game.pizzaCustomers,x+","+y);
		if(index != 3.14 && !tools.arrayContains(Game.save.happyPizzaCustomers,index) && Player.save.inventory.item.pizza > 0 && Game.save.happyPizzaCustomers.length<9) {
			var goldget = tools.getRandomInt(40000,50000);
			Player.save.gold += goldget;
			Game.save.happyPizzaCustomers.push(index);
			Player.removeItem("pizza",1);
			UI.addLog("You have delivered <b>"+Game.save.happyPizzaCustomers.length+"</b> pizzas and received <b>"+goldget+"</b> gold.");
			UI.update();
			UI.hideAlert();
		}
		//else console.log(index, tools.arrayContains(Game.save.happyPizzaCustomers,index), Player.save.inventory.item.pizza);
	},
	
	negativeZone: function() {
		UI.hideAlert();
		Player.move(-200,-200, "negative");
		UI.addLog("You entered the portal.");
	},
	
	read: function(num) {
	
		var scroll = "";
		
		if(num==1) {
scroll='   _________________________\n\
 =(__    ___     __  ___   _)=\n\
   |                       |\n\
   |   玫瑰是红色的          |\n\
   |   紫罗兰是蓝色的        |\n\
   |   我所有的基地          |\n\
   |   属于你               |\n\
   |__    ___   __    ___  |\n\
 =(_________________________)=\n\
';
		}
		else if(num==2) {
scroll='  _____________________________________________\n\
 =(__    ___      __    _____   ___      ____   _)=\n\
   |                                            |\n\
   |   哦，我的心，不要着急跳动,                    |\n\
   |   现在不要跳出我的胸膛!                       |\n\
   |   我不能再坚持了,                            |\n\
   |   喔，米娅科尔\'!                            |\n\
   |                                            |\n\
   |   啊我的心啊！ 经过长时间的工作                |\n\
   |   &#264u 我不会在决定性的时刻获胜\'?          |\n\
   |   苏菲派 &#265e！ 从殴打中冷静下来,            |\n\
   |   喔，米娅科尔\'!                            |\n\
   |__    ___   __    ___  _________        _   |\n\
 =(______________________________________________)=\n\
';			
		}
		else if(num==3) {
scroll='   _____________________________________________\n\
 =(__    ___      __    _____   ___      ____   _)=\n\
   |                                            |\n\
   |   传说在一个神秘的地方                        |\n\
   |   被称为“负面区域”，有一个                    |\n\
   |   生物拥有无限生命值和                        |\n\
   |   高伤害。 谁能打败它                         |\n\
   |   会有属于自己的冒险                          |\n\
   |   一生名声大噪.                              |\n\
   |__    ___   __    ___  _________        _   |\n\
 =(______________________________________________)=\n\
';			
			Player.save.hasReadLiterature3 = true;
		}
		else if(num==4) {
scroll='   _____________________________________________\n\
 =(__    ___      __    _____   ___      ____   _)=\n\
   |                                            |\n\
   |   事情是这样的。 你说“寒鸦                    |\n\
   |   是乌鸦."                                 |\n\
   |                                            |\n\
   |   是在同一个家庭吗？ 是的。 没                 |\n\
   |   有人在争论这一点。                          |\n\
   |                                            |\n\
   |   作为一个科学家                             |\n\
   |   研究乌鸦，我告诉你,                         |\n\
   |   具体来说，在科学中，没有人称                  |\n\
   |   寒鸦为乌鸦。 如果你想成为                    |\n\
   |   “具体”就像你说的那样，那么你                  |\n\
   |   也不应该。 他们是不一样的                    |\n\
   |   东西.                                     |\n\
   |                                            |\n\
   |   如果你说的是“乌鸦家族”                      |\n\
   |   参考分类学分组                             |\n\
   |   鸦科，其中包括来自                          |\n\
   |   从胡桃夹子到蓝鸟再到乌鸦.                    |\n\
   |                                            |\n\
   |   所以你打电话的原因                          |\n\
   |   寒鸦是一只乌鸦是因为随机                     |\n\
   |   人们“称黑人为乌鸦？”                        |\n\
   |   让我们把 黑羽椋鸟 和 黑鸟 放进去              |\n\
   |   那么，那里也是。                            |\n\
   |                                            |\n\
   |   此外，称某人为人或                          |\n\
   |   猿？ 这不是一个或另一个，那是                 |\n\
   |   不是分类学的工作原理。 他们都是               |\n\
   |   寒鸦是寒鸦，是寒鸦的成员                     |\n\
   |   乌鸦家族。 但这不是什么                      |\n\
   |   你说。 你说寒鸦是                           |\n\
   |   乌鸦，这不是真的，除非你是                    |\n\
   |   可以打电话给所有成员                         |\n\
   |   乌鸦家族乌鸦，这意味着你会                    |\n\
   |   给蓝鸟、乌鸦和其他人打电话                   |\n\
   |   鸟也叫。 你说你哪个                         |\n\
   |   别。                                      |\n\
   |                                            |\n\
   |   承认你是可以的                             |\n\
   |   错了，你知道吗？                           |\n\
   |__    ___   __    ___  _________        _   |\n\
 =(______________________________________________)=\n\
';			
		}
		
		document.getElementById("scroll-text").innerHTML = scroll;
		UI.hideAlertFast();
		UI.showAlert("script");
		
	},
	
	loan: function(action) {
		if(action=="small") {
			if(!Player.save.hasLoan) {
				Player.save.hasLoan = true;
				Player.save.gold += 1000000;
				UI.addLog("You took a small loan of a million gold.");
				UI.hideAlert();
			}
		}
		else if(action=="pay") {
			if(Player.save.hasLoan) {
				if(Player.save.gold >= 1000000) {
					Player.save.hasLoan = false;
					Player.save.gold -= 1000000;
					UI.addLog("You paid your loan.");
					UI.hideAlert();
				}
				else { alert('金币不够！'); }
			}
		}
		UI.update();
	},
	
	temple: function(action) {
	
		document.getElementById("temple-gun").style.display = "none";
		document.getElementById("temple-potion").style.display = "none";
		document.getElementById("temple-armor").style.display = "none";
		document.getElementById("craft-armor").style.display = "none";
		document.getElementById("craft-potion").style.display = "none";
		
		if(action=="armor") {
			document.getElementById("temple-title").innerHTML = "Dragon Armor";
			document.getElementById("temple-armor").style.display = "block";
			document.getElementById("craft-armor").style.display = "block";
		}
		else if(action=="gun") {
			Player.save.devAway = false;
			document.getElementById("temple-title").innerHTML = "Infinity Gun";
			document.getElementById("temple-gun").style.display = "block";
		}
		else if(action=="potion") {
			document.getElementById("temple-title").innerHTML = "Blue Heart Potion";
			document.getElementById("temple-potion").style.display = "block";
			document.getElementById("craft-potion").style.display = "block";
		}
		
		UI.hideAlertFast();
		UI.showAlert("temple2");
		
	},
	
	craft: function(what) {
		if(what=="armor") {
			if(!tools.arrayContains(Player.save.inventory.body, "dragon-armor")) {
				if(Battle.getWeaponInfo("knife").damage >= 50000) {
					if(Player.numItems("dragon-corpse") >= 20) {
						Player.removeItem("dragon-corpse", 20);
						Player.save.inventory.body.push("dragon-armor");
						alert('你成功制作了龙甲！');
						UI.hideAlert();
						UI.addLog("你制作了龙盔甲，别忘了使用它！");
					}
					else { alert('你还没有足够的龙尸来制作盔甲！'); }
				}
				else { alert('你的刀需要至少 50,000 点伤害才能制作盔甲！'); }
			}
			else { alert('你已经有了盔甲！'); }
		}
		else if(what=="potion") {
			if(tools.arrayContains(Player.save.inventory.body, "dragon-armor")) {
				var numpotions = prompt("你想要制作多少蓝心药水?", "1");
				numpotions = parseInt(Math.abs(Math.round(numpotions)));
				if(isNaN(numpotions) || numpotions<1) numpotions = 1;
				if(confirm("你确定要制作 "+tools.num(numpotions)+" 蓝心药水?")) {
					if(Player.numItems("heart") >= numpotions) {
						if(Player.numItems("s_heart") >= numpotions) {
							Player.removeItem("heart", numpotions);
							Player.removeItem("s_heart", numpotions);
							Player.save.hp += 500000 * numpotions;
							Player.save.maxhp += 500000 * numpotions;
							UI.addLog("You drank <b>"+tools.num(numpotions)+"</b> blue heart potion(s) and now you have <b>"+tools.num(Player.save.maxhp)+"</b> max HP!");
						}
						else { alert('你没有足够的闪闪发光的心！'); }
					}
					else { alert('你没有足够的蓝心!'); }
				}
			}
			else { alert('你没有龙甲!'); }
		}
		UI.update();
	},
	
	getLevel: function() {
		var i = 0;
		while(Player.save.xp >= Game.levels[i]) i++;
		return i;
	},
	
	getCurrentXP: function() {
		return Player.save.xp - Game.levels[Player.getLevel(Player.save.xp)-1];
	},
	
	getMaxXP: function() {
		var lvl = Player.getLevel(Player.save.xp);
		return Game.levels[lvl] - Game.levels[lvl-1];
	}
	
};
