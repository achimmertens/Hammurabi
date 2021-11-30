package main.java.de.achim.data;

public class Round {
    // Eigenschaften
    private double treasure = 100.00f;
    private double population =100;
    private float tax=5;
    private long food=100;
    private int year=0;
    private double score = 0;
    private double harvest=0;

    // Konstruktoren

    public Round() {
        this.treasure = 100.00f;
        this.population =100;
        this.tax = 5;
        this.food = 100;
        this.year = 0;
        this.score = 0;
        this.harvest =0;
    }

    public Round(double treasure, double population, float tax, long food, int year, double score, double harvest) {
        this.treasure = treasure;
        this.population = population;
        this.tax = tax;
        this.food = food;
        this.year = year;
        this.score = score;
        this.harvest = harvest;
    }

    // Getter + Setter

    public double getTreasure() {
        return treasure;
    }

    public void setTreasure(double treasure) {
        this.treasure = treasure;
    }

    public double getPopulation() {
        return population;
    }

    public void setPopulation(double population) {
        this.population = population;
    }

    public float getTax() {
        return tax;
    }

    public void setTax(float tax) {
        this.tax = tax;
    }

    public long getFood() {
        return food;
    }

    public void setFood(long food) {
        this.food = food;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
    }

    public double getHarvest() {
        return harvest;
    }

    public void setHarvest(double harvest) {
        this.harvest = harvest;
    }


    //Business Logik

    @Override
    public String toString() {
        return "Round{" +
                "treasure=" + treasure +
                ", population=" + population +
                ", tax=" + tax +
                ", food=" + food +
                ", year=" + year +
                ", score=" + score +
                ", harvest=" + harvest +
                '}';
    }
}
