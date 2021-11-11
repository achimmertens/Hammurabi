package hamurabi;

public class Event {

	
	public String ev = "nothing special";
	public double random = Math.round(Math.random()*100);
	public double impact = Math.round(Math.random()*75)+25; // Zwischen 75 und 100
	public double prob = Math.round(Math.random()*100);
	
	public void main(String[] args) {
		
		//Event myObj = new Event();
		
		// TODO Auto-generated method stub
//		System.out.println(myObj.random);
		
			
	}

	public void event () {
		random = Math.round(Math.random()*100);
		if (prob < 25) {  // impact probality
			if (random < 25) { ev = "a famine";}
			else if (random < 50) {ev = "an attac";}
			else if (random < 75) {ev = "an earthquake";}
			else if (random < 100) {ev = "an epidemy";}
		}
		else
		{ev = "nothing special";}
	}
	
}
