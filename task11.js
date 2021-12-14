let cities = [
    {
        country: "Japan",
        name: "Tokyo",
        population: 13515271,
    },
    {
        country: "India",
        name: "Delhi",
        population: 16753235,
    },
    {
        country: "China",
        name: "Shanghai",
        population: 24870895,
    },
    {
        country: "Brazil",
        name: "São Paulo",
        population: 12252023,
    },
    {
        country: "Mexico",
        name: "Mexico City",
        population: 9209944,
    }
];

function mostPopulationCity(city, n) {
    return city.sort((a, b) => b.population - a.population).splice(0, n);
}
