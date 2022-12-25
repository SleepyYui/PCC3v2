// @ts-ignore
const logger = require("../../handlers/logger");
module.exports = {
  name: "test", //the command name for the Slash Command
  description: "Test the slash command", //the command description for Slash Command Overview
  cooldown: 5, //the cooldown for the command in seconds (max. 60) 
  memberpermissions: [], //Only allow members with specific Permissions to execute a Command [OPTIONAL]
  requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
  alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
  options: [ //OPTIONAL OPTIONS, make the array empty / don't add this option if you don't need options!
	//INFORMATION! You can add Options, but mind that the NAME MUST BE LOWERCASE! AND NO SPACES!!!, for the CHOICES you need to add a array of arrays; [ ["",""] , ["",""] ]
	//WARNING: If you add an option that is not required, you need to put it last, otherwise it will be ignored!

		{"Integer": { name: "integer_test", description: "This is a test for the Integer option", required: true }}, //to use in the code: interaction.getInteger("integer_test")
		{"String": { name: "string_test", description: "This is a test for the String option", required: true }}, //to use in the code: interaction.getString("string_test")
		{"User": { name: "user_test", description: "This is a test for the User option", required: true }}, //to use in the code: interaction.getUser("user_test")
		{"Channel": { name: "channel_test", description: "This is a test for the Channel option", required: true }}, //to use in the code: interaction.getChannel("channel_test")
		{"Role": { name: "role_test", description: "This is a test for the Role option", required: true }}, //to use in the code: interaction.getRole("role_test")
		{"IntChoices": { name: "int_choices_test", description: "This is a test for the Integer-Choices option", required: true, choices: [["Option Name", 1], ["2 is the Value of this Option", 2]] }}, //here the second array input MUST BE A NUMBER // TO USE IN THE CODE: interaction.getInteger("int_choices_test") //WARNING: Do not use. This option is really buggy!
		{"StringChoices": { name: "str_choices_test", description: "This is a test for the String-Choices option", required: true, choices: [["name", "choice_id"], ["Example Name", "example_id"]] }}, //here the second array input MUST BE A STRING // TO USE IN THE CODE: interaction.getString("str_choices_test")
	
  ],
  run: async (client: any, interaction: { reply?: any; member?: any; channelId?: any; guildId?: any; applicationId?: any; commandName?: any; deferred?: any; replied?: any; ephemeral?: any; options?: any; id?: any; createdTimestamp?: any; }) => {
    try{
		
		//things you can directly access in an interaction!
		const { member, channelId, guildId, applicationId, 
		        commandName, deferred, replied, ephemeral, 
				options, id, createdTimestamp 
		} = interaction; 

		const { guild } = member;

		//let Optional = options.getString("OPTIONAL"); //same as in StringChoices //RETURNS STRING //Valid gets are: getString, getInteger, getUser, getChannel, getRole
		let Integer_Test = options.getInteger("integer_test");
		let String_Test = options.getString("string_test");
		let User_Test = options.getUser("user_test");
		let Channel_Test = options.getChannel("channel_test");
		let Role_Test = options.getRole("role_test");
		let IntChoices_Test = options.getInteger("int_choices_test");
		let StringChoices_Test = options.getString("str_choices_test");

		await interaction.reply({content: `This is a Test\nInteger: ${Integer_Test}\nString: ${String_Test}\nUser: ${User_Test.id}\nChannel: ${Channel_Test.name}\nRole: ${Role_Test.id}\nInteger Choices: ${IntChoices_Test}\nString Choices: ${StringChoices_Test}`, ephemeral: true}); 


    } catch (e) {
        logger.error(e);
    }
  }
}
