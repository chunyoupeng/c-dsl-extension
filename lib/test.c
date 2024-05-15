@transaction("test")
@desc("it is a test")
struct TopicA{
	@attr("WORKSTATE")
	@name("工作状态")
	@bitInfo(69, 70, 2)
	@valueRange([0, 3))
	@valueDesc("0为单脉冲、1为SAR、2～3预留")
	char* workState;

};