package hamurabi;

// **************************************************
// ****************** Hamurabi **********************
// *********** Written by Achim Mertens *************
// Version 2021.Nov.09
// **************************************************

//import java.util.Scanner; // Import the Scanner class

public class Hamurabi {

	public static void main(String[] args) {
		// TODO Auto-generated method stub

		System.out.println("Hamurabi");
		
		double treasure = 100.00f;
		double population =100;
		float tax=5;
		long food=100;
		int year=0;
		double score = 0;
		double harvest=0;

		
		System.out.println("Dear King Hamurabi, try to get the highest treasure! (Enter 100 to end the game)");
		System.out.println("Hint: Increasing the tax increases the the treasure but lowers the foodstorage");
		System.out.println("The higher the treasure, the higher the foodstorage, the higher the population. Keep foodstorage higher then population to grow.");
		System.out.println("The start treasure is: "+treasure+", the start population is: "+population+", the start foodstorage is: "+food);
		
		while (treasure>0 && food>0 && population>2 && tax < 100)
		{
		
			@SuppressWarnings("resource")
//			Scanner myTax = new Scanner(System.in); // Create a Scanner object
			/* HelloWorld.main(args); */
			Event myObj = new Event();
			myObj.event();
			
			year = year + 1;
			System.out.println("Year Number: "+year);

			
			
//		    System.out.println("Type in the new taxrate for the year "+year+": ");
			String input="Type in the new taxrate for the year " + year+": ";
			tax = Float.valueOf(javax.swing.JOptionPane.showInputDialog(input)); 
			

		    harvest = Math.round((population)*0.7 + population*0.3*(Math.random()+0.5));
		    treasure = treasure + tax;
			food = Math.round(food - population + harvest + treasure*0.1 - tax) ;
			population = population + Math.round ((food - population)/population*100);
			score = score + treasure/year;
			
			System.out.println("This year we had "+myObj.ev); //Hier wird ein Attribut einer Instanz/ eines Objekts aufgerufen
//		    if (myObj.ev == "a famine") {
//		    	harvest = harvest * myObj.impact/100;
//		    	System.out.println("Your harvest was reduced to: " +harvest);
//		  		    }
		    
		    
		    switch (myObj.ev){
            case "a famine":
            	System.out.println("The impact was "+myObj.impact+"%");
            	harvest = harvest * myObj.impact/100;
            	System.out.println("Your harvest was reduced to: " +harvest);
            case "an attac":
            	System.out.println("The impact was "+myObj.impact+"%");
            	harvest = harvest * myObj.impact/100;
                population = population * myObj.impact/100;
                treasure = treasure * myObj.impact/100;
                System.out.println("Your harvest was reduced to: " +harvest);
                System.out.println("Your population was reduced to: " +population);
                System.out.println("Your treasure was reduced to: " +treasure);
            case "an earthquake":
            	System.out.println("The impact was "+myObj.impact+"%");
            	population = population * myObj.impact/100;
                treasure = treasure * myObj.impact/100;
                System.out.println("Your population was reduced to: " +population);
                System.out.println("Your treasure was reduced to: " +treasure);
            case "an epidemy":
            	System.out.println("The impact was "+myObj.impact+"%");
            	population = population * myObj.impact/100;
                System.out.println("Your harvest was reduced to: " +harvest);
                System.out.println("Your population was reduced to: " +population);
                System.out.println("Your treasure was reduced to: " +treasure);
            	
            }
		    
		    
			System.out.println("The Treasure is: "+treasure+", the harvest was "+harvest+", the foodstorage is: "+food+", the population is: "+population + ", your score is: "+score);
			

		}	
		
		System.out.println("Game Over");
	}
}