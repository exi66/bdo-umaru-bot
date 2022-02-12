const fs = require("fs");

module.exports = {
    name: "start",
	category: "bdo",
    description: "Быстрое начало работы",
    usage: "<input>",
    run: async(client, message, args, config) => {
        message.delete();
		let configurations_list = JSON.parse(fs.readFileSync(config.servers_configs_folder));
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("у вас нет прав использовать эту команду.").then(m => m.delete({ timeout: 10000 }));
        let category_id = message.guild.channels.cache.find(c => c.name == "bdo-umaru" && c.type == "category");
		let local_rr = [];
		let local_config = {
			"guild": message.guild.id,
			"premium": false,
			"category": "",
			"queue": "",
			"coupons": "",
			"coupons-role": "",
			"items": []
		}
        if (category_id) return message.reply("категория уже существует!").then(m => m.delete({ timeout: 10000 }));
		await message.guild.roles.create({
			data: {
				name: "Купоны",
				color: "#9b59b6",
			},
			reason: "Роль для упоминания при публикации купонов",
		}).then(role => {
			local_config["coupons-role"] = role.id;					
		});	
		await message.guild.roles.create({
			data: {
				name: "БС-V",
				color: "#bf0000",
				mentionable: true,
			},
			reason: "Роль для упоминания при продаже V бс",
		}).then(role => {
			local_config["items"].push({
				"role": role.id,
				"enchant": 20,
				"ids" : [
					731114,
					731109,
					731117,
					731106,
					731102,
					731113,
					731116,
					731107,
					731101,
					731108,
					731103,
					731104,
					731111,
					731112,
					731115,
					731110,
					731105,
					731118,
					731119,
					731120,
					731121,
					731122,
					715001,
					715003,
					715005,
					715007,
					715009,
					715011,
					715013,
					715016,
					715017,
					715019,
					715021,
					718616,
					690563,
					692045,
					730564,
					732313,
					733063
				]						
			});				
		});	
		await message.guild.roles.create({
			data: {
				name: "Манос-V",
				color: "#398e55",
				mentionable: true,
			},
			reason: "Роль для упоминания при продаже V бижутерии маноса",
		}).then(role => {
			local_config["items"].push({
				"role": role.id,
				"enchant": 5,
				"ids":	[
					705510,
					705512,
					705509,
					705511
				]
			});				
		});	
		await message.guild.roles.create({
			data: {
				name: "Деборика-IV",
				color: "#c09c3f",
				mentionable: true,
			},
			reason: "Роль для упоминания при продаже IV бижутерии деборики",
		}).then(role => {
			local_config["items"].push({
				"role": role.id,
				"enchant": 4,
				"ids":	[
					11653,
					12276
				]		
			});				
		});
		await message.guild.roles.create({
			data: {
				name: "Деборика-V",
				color: "#ffce53",
				mentionable: true,
			},
			reason: "Роль для упоминания при продаже V бижутерии деборики",
		}).then(role => {
			local_config["items"].push({
				"role": role.id,
				"enchant": 5,
				"ids":	[
					11653,
					12276
				]		
			});				
		});
		await message.guild.channels.create("bdo-umaru", {
			type: "category",
			permissionOverwrites: [
				{
					id: message.guild.id,
					allow: ["VIEW_CHANNEL"],
				}]
		}).then(cat => {
			local_config.category = cat.id;
			message.guild.channels.create("queue", {
				type: "text",
				parent: cat,
				permissionOverwrites: [
					{
						id: message.guild.id,
						allow: ["VIEW_CHANNEL"],
					}]
			}).then(channel_queue => {
				local_config.queue = channel_queue.id;
				save(config, configurations_list, local_config);	
			});
			message.guild.channels.create("coupons", {
				type: "text",
				parent: cat,
				permissionOverwrites: [
					{
						id: message.guild.id,
						allow: ["VIEW_CHANNEL"],
					}]
			}).then(channel_coupons => {
				local_config.coupons = channel_coupons.id;
				save(config, configurations_list, local_config);	
			});			
		});
		save(config, configurations_list, local_config);																														
    }
}

function save(config, configurations_list, local_config) {
	let flag = false;
	for (let i = 0; i < configurations_list.length; i++) {
		if (configurations_list[i].guild == local_config.guild) {
			configurations_list[i] = local_config;
			flag = true;
		}
	}
	if (!flag) configurations_list.push(local_config);
	fs.writeFile(config.servers_configs_folder, JSON.stringify(configurations_list, null, 4), function (err) {
		if (err) return print_e(err);
	});		
}