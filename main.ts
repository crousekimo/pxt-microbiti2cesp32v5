//% weight=0 color=#EC7505 icon="\uf0ad" block="microbiti2cesp32v5"
namespace microbiti2cesp32v5 {

     export enum openweathermapmenu {
        Lon = 1,
        Lat = 2,
        Temperature = 3,
        Pressure = 4,
        Humidity = 5,
	WindSpeed = 6
     }
     export enum pin_mode {
        OUTPUT = 1,
        INPUT = 2
     }
     export enum ntptime {
        Your = 0,
        Month = 1,
        Day = 2,
        Hour = 3,
        Min = 4,
	Sec = 5
     }
     let datelist: string[] = []
     let mqttlist: string[] = []	
     let nptgettime="";	
     let mqttmessage="";
     let mqtttopic="";
     
     export enum value555 {
        field1 = 1 ,
        field2 = 2,
        field3 = 3,
        field4 = 4,
        field5 = 5,
        field6 = 6,
        field7 = 7,
        field8 = 8
     }
     let aa=0;
     function check()
     {
	     if (aa==0)
	     {
		     basic.pause(6000)
		     aa=1
	     }
     }
    //% group="1.Setup"
    //% blockId=setWiFi block="Set WIFI | SSID %SSID| Pass %PASS"
    //% weight=101
    //% blockExternalInputs = 1
    export function setWiFi(SSID: string, PASS: string):void {
	check()
        sendi2cmessage("setwifi="+SSID+","+PASS+",1")
	basic.pause(2000)
    }
    //% group="1.Setup"
    //% blockId=iprequest block="Read WIFI IP"
    //% weight=50
    //% blockExternalInputs = 1
    export function iprequest():string {
	check()
        let a=receivei2cmessage("iprequest=").substr(1)
   	if (!a.includes("iprequest"))
           a=receivei2cmessage("iprequest=").substr(1)
	basic.pause(100)
        a=a.substr(9)
	return a
    }
    //% group="2.MQTT"  
    //% blockId=subMqtt block="Subscribe mqtt %topic"
    //% weight=100 
    export function subMqtt(topic: string):void {
	 check()
         sendi2cmessage("sebmqtt="+topic)
	 basic.pause(200)
    }
    //% group="2.MQTT"  
    //% blockId=ReceiveMqttTopic block="receive mqtt topic"
    //% weight=98	
    export function ReceiveMqttTopic():string {
        let a=receivei2cmessage("mqttrec=")
	basic.pause(100)
   	if (!a.includes("mqttrec"))
             a=receivei2cmessage("mqttrec=")
        a=a.substr(8)
	mqttlist=a.split(",")
	return mqttlist[0]
    }  
    //% group="2.MQTT"  
    //% blockId=ReceiveMqttMessage block="receive mqtt message"
    //% weight=97 	
    export function ReceiveMqttMessage():string {
        return mqttlist[1]
    }  

    //% group="2.MQTT"  
    //% blockId=clearmqtt block="clear mqtt topic and message"
    //% weight=57 
    export function clearmqtt():void {
        sendi2cmessage("clearmqtt=")
	basic.pause(100)
    }  
	
	
    //% group="2.MQTT"  
    //% blockId=sendmqtt block="send mqtt topic %topic | message %message "
    //% weight=56 
    export function sendmqtt(topic: string, message: string):void {
        sendi2cmessage("sendmqtt="+topic+","+message)
	basic.pause(100)
    }  
    //% group="3.Line notify"  
    //% blockId=linetoken block="Line notify token %token "
    //% weight=100 
    export function linetoken(token: string):void {
	check()
        sendi2cmessage("linetoken="+token)
	basic.pause(200)
    }  
    //% group="3.Line notify"  
    //% blockId=linemessage block="Line notify message %message "
    //% weight=57 
    export function linemessage(message: string):void {
        sendi2cmessage("linemessage="+message)
	basic.pause(200)
    }  
    //% group="3.Line notify"  
    //% blockId=linesticker block="Line notify sticker message %message | packageID %packageID | stickerID %stickerID "
    //% weight=56 
    export function linesticker(message: string,packageID: number, stickerID: number):void {
        sendi2cmessage("linesticker="+message+","+packageID.toString()+","+stickerID.toString())
	basic.pause(200)
    }  
  //% group="4.OpenWeatherMap"  	
    //% blockId=openweathermapsetup block="OpenWeatherMap key %key "
    //% weight=99 
    export function openweathermapsetup(key: string):void {
	check()
        sendi2cmessage("openweathermapsetup="+key)
	basic.pause(200)
    }  
    //% group="4.OpenWeatherMap"  
    //% blockId=openweathermapcity block="OpenWeatherMap city %city "
    //% weight=45
    export function openweathermapcity(city: string):void {
        sendi2cmessage("openweathermapcity="+city)
	basic.pause(400)
    }  
  //% group="4.OpenWeatherMap"  
    //% blockId=openweathermapreturn block="OpenWeatherMap option %option "
    //% weight=20 
    export function openweathermapreturn(option: openweathermapmenu):number {
        let a=receivei2cmessage("openweathermapreturn="+option.toString()).substr(1)
	basic.pause(100)
        a=receivei2cmessage("openweathermapreturn="+option.toString()).substr(1)
	basic.pause(100)
        a=a.substr(20) 
	return parseFloat(a)
    } 

    //% group="5.IFTTT"  
    //% blockId=sendifttt block="send ifttt key %key | event %event | value1 %value1 | value2 %value2 | value3 %value3"
    //% weight=50
    export function sendifttt(key: string, event: string, value1: string, value2: string, value3: string):void {
	value1=value1+"&value2="+value2+"&value3="+value3;
        sendi2cmessage("ifttt="+key+","+event+","+value1) 
	basic.pause(200)
    }

	
    //% group="6.NTP"  
    //% blockId=ntpsetup block="NTP setup"
    //% weight=70
    export function ntpsetup():void {
	check()
        sendi2cmessage("ntps=") 
	basic.pause(200)
    }
	
     //% group="6.NTP"  
    //% blockId=ntpget block="ntpget"
    //% weight=50
    export function ntpget():void {
        sendi2cmessage("ntpget1=")
	basic.pause(200)
	nptgettime=receivei2cmessage("ntpget2=").substr(1)
	if (!nptgettime.includes("ntpget2"))
	        nptgettime=receivei2cmessage("ntpget2=").substr(1)
        nptgettime=nptgettime.substr(7)
	datelist=nptgettime.split(",")
    }
	
    //% group="6.NTP"  
    //% blockId=ntpgettime block="read %time1"
    //% weight=30
    export function ntpgettime(time1: ntptime):number {
        return parseFloat(datelist[time1])
    }

     //% group="7.google"  
    //% blockId=google1 block="set google form question %google_number as %google_ans" 
    //% weight=70
    export function google1(google_number: number, google_ans: string):void {
        sendi2cmessage("google1="+convertToText(google_number)+","+google_ans)
	basic.pause(200)
    }
	
    //% group="7.google"  
    //% blockId=google2 block="set google form url as %google_url" 
    //% weight=70
    export function google2(google_url: string):void {
        sendi2cmessage("google2="+convertToText(google_url))
	basic.pause(200)
    }
	
     //% group="7.google"  
    //% blockId=google block="Send to Google form"
    //% weight=30
    export function google():void {
        sendi2cmessage("google=") 
	basic.pause(200)
    }
	
    //% group="8.HTTP_COMMAND"
    //% blockId=http_command block="Read HTTP COMMAND"
    //% weight=29
    //% blockExternalInputs = 1
    export function http_command():string {
	check()
        let a=receivei2cmessage("http_r=").substr(1)
        a=receivei2cmessage("http_r=").substr(1)
        a=a.substr(6)
	return a
    }
	
    //% group="8.HTTP_COMMAND"
    //% blockId=clear_httpcommand block="Clear HTTP COMMAND"
    //% weight=28
    export function clear_httpcommand():void {
        sendi2cmessage("clear_httpcommand=") 
	basic.pause(200)
    }
	
    //% group="8.HTTP_COMMAND"
    //% blockId=http_command1 block="Microbit data %data"
    //% weight=27
    export function http_command1(data: string):void {
        sendi2cmessage("http_d="+data) 
	basic.pause(200)
    }
    //% group="9.HTTP_HTML"
    //% blockId=http_refresh block="Refresh web page %num sec"
    //% weight=26
    export function http_refresh(num: string):string {
        return "<meta http-equiv=refresh content="+num+">"
    }
    //% group="9.HTTP_HTML"
    //% blockId=http_center block="center"
    //% weight=25
    export function http_center():string {
        return "<center>"
    }
    //% group="9.HTTP_HTML"
    //% blockId=http_center1 block="center end"
    //% weight=24
    export function http_center1():string {
        return "</center>"
    }

    //% group="9.HTTP_HTML"
    //% blockId=http_br block="br"
    //% weight=23
    export function http_br():string {
        return "<br>"
    }

    //% group="9.HTTP_HTML"
    //% blockId=http_href block="href send command: %data text: %text"
    //% weight=22
    export function http_href(data: string, text: string):string {
        return "<a href=http_d2="+data+">"+text+"</a>"
    }
    //% group="9.HTTP_HTML"
    //% blockId=http_space block="insert %num space"
    //% num.min=1 num.max=1000 num.defl=1
    //% weight=21
    export function http_space(num: number):string {
	let a="";
	for (let i=0;i<num;i++)
		a=a+"&nbsp;"
        return a
    }

    //% group="9.HTTP_HTML"
    //% blockId=http_p block="paragraph font size %num "
    //% num.min=1 num.max=1000 num.defl=1
    //% weight=20
    export function http_p(num: number):string {
        return "<p style=font-size:"+num+"vw;>"
    }
    //% group="9.HTTP_HTML"
    //% blockId=http_p1 block="paragraph end"
    //% weight=19
    export function http_p1():string {
        return "</p>"
    }	
    //% group="9.ESP32_CONTROL"
    //% blockId=esp32_pinmode block="ESP32 Pin %pin as %pin1 "
    //% pin.min=1 pin.max=39 pin.defl=1
    //% weight=20
    export function esp32_pinmode(pin: number, pin1: pin_mode):void {
        sendi2cmessage("pinMode="+convertToText(pin)+","+convertToText(pin1))
	basic.pause(200)
    }
    //% group="9.ESP32_CONTROL"
    //% blockId=esp32_digitalwrite block="ESP32 digitalWrite pin %pin as %pin1"
    //% pin.min=1 pin.max=39 pin.defl=1
    //% pin1.min=0 pin1.max=1 pin1.defl=0
    //% weight=19
    export function esp32_digitalwrite(pin:number, pin1: number):void {
        sendi2cmessage("digitalWrite="+convertToText(pin)+","+convertToText(pin1))
	basic.pause(200)
    }
    //% group="9.ESP32_CONTROL"
    //% blockId=esp32_analogwrite block="ESP32 analogWrite pin %pin as %pin1"
    //% pin.min=1 pin.max=39 pin.defl=1
    //% pin1.min=0 pin1.max=255 pin1.defl=0
    //% weight=18
    export function esp32_analogwrite(pin:number, pin1: number):void {
        sendi2cmessage("analogWrite="+convertToText(pin)+","+convertToText(pin1))
	basic.pause(200)
    }
    //% group="9.ESP32_CONTROL"  
    //% blockId=esp32_digitalread block="ESP32 digitalRead %pin"
    //% pin.min=1 pin.max=39 pin.defl=1
    //% weight=17 
    export function esp32_digitalread(pin: number):number {
        let a=receivei2cmessage("digitalRead="+pin.toString()).substr(1)
	basic.pause(50)
        a=receivei2cmessage("digitalRead="+pin.toString()).substr(1)
	basic.pause(50)
        a=a.substr(11) 
	return parseFloat(a)
    } 
    //% group="9.ESP32_CONTROL"  
    //% blockId=esp32_analogread block="ESP32 analogRead %pin"
    //% pin.min=1 pin.max=39 pin.defl=1
    //% weight=16 
    export function esp32_analogread(pin: number):number {
        let a=receivei2cmessage("analogRead="+pin.toString()).substr(1)
	basic.pause(50)
        a=receivei2cmessage("analogRead="+pin.toString()).substr(1)
	basic.pause(50)
        a=a.substr(10) 
	return parseFloat(a)
    } 
    //% group="9.Make.com"  
    //% blockId=make block="Send Make key %key value1 %value1 value2 %value2 value3 %value3"
    //% weight=16 
    export function make(key: string, value1: string, value2: string, value3: string) {
        sendi2cmessage("make="+key+","+value1+","+value2+","+value3)
	basic.pause(200)
    }
	
    function sendi2cmessage(command: string):void {
        for (let index = 0; index <= command.length-1; index++) {
        	pins.i2cWriteNumber(
        	8,
        	command.charCodeAt(index),
        	NumberFormat.Int8LE,
        	false
        	)
        }
        pins.i2cWriteNumber(
	8,
	10,
	NumberFormat.Int8LE,
	false
	)
    } 
    
    function receivei2cmessage(command: string):string {
    let i2cmessage2 = ""
    let aa: number[] = []
    for (let index2 = 0; index2 <= command.length-1; index2++) {
        pins.i2cWriteNumber(
        8,
        command.charCodeAt(index2),
        NumberFormat.Int8LE,
        false
        )
    }

    pins.i2cWriteNumber(
    8,
    10,
    NumberFormat.Int8LE,
    false
    )
    basic.pause(300)
    i2cmessage2=""
    let dd = pins.i2cReadBuffer(8,952,false)
    for (let index = 0; index <= 718; index++) {

        let messagecheck2 = dd.getNumber(NumberFormat.Int8LE, index)
        if (messagecheck2 == -1) {
            break;
        }else {
            i2cmessage2 = i2cmessage2 + String.fromCharCode(messagecheck2)
	}
    }
    return i2cmessage2	    
    }

    function receivei2cmessage2(command: string):string {
    let i2cmessage2 = ""
    let aa: number[] = []
    for (let index2 = 0; index2 <= command.length-1; index2++) {
        pins.i2cWriteNumber(
        8,
        command.charCodeAt(index2),
        NumberFormat.Int8LE,
        false
        )
    }
    pins.i2cWriteNumber(
    8,
    10,
    NumberFormat.Int8LE,
    false
    )
    basic.pause(2000)
    i2cmessage2=""
    let dd = pins.i2cReadBuffer(8,952,false)
    for (let index = 0; index <= 718; index++) {
        let messagecheck2 = dd.getNumber(NumberFormat.Int8LE, index)
        if (messagecheck2 == -1) {
            break;
        }else {
            i2cmessage2 = i2cmessage2 + String.fromCharCode(messagecheck2)
	}
    }
    return i2cmessage2	    
    }

}
