# crypto-statistic-volume

> The idea was to create a module that notifies users about statistically significant changes in trading volume. 
> 
> Red KS value is always lower than 0.1 and it is probably a sign of statistically significant changes in volume. If you click on a card and expand it then you will see three graphs. The blue one shows the daily volume, the black one shows the average volume in days 1-15, and the green one corresponds to days 15-30.
> 
> I deliberately made graphs hidden by default. The concept is to show a signal first (red KS value) and if a user is interested then he/she could check out the graph itself. 
> 
> Here how it works on low-level:
> 1. The module gets top 30 currencies by volume from the santiment’s API. 
> 2. For each of them, it also queries last 30 days volume history. 
> 3. Then each series is considered as two sets: volume in days 1-15 and volume in days 15-30.
> 4. I test these two sets with Kolmogorov-Smirnov statistical test. If you disagree with it then you can read the explanation below.
> 5. Finally, the module displays cards. A card shows KS value and also a change in average volume between two periods (days 1-15 and 15-30). 
> 
> I used the Kolmogorov-Smirnov non-parametric test assuming independence of volume values. I did it because it was the simplest way to check my idea. Most probably the values are dependent as we speak about time series, so the test should be replaced with a more suitable one. If you have something in mind then let me know, please.
> 
> Also, I wasn’t able to find a trustable JS implementation of the KS-test, so I used the implementation from the scipy library. For this, I created a simple AWS lambda server, you can find the source on GitHub.


> On a high level, the KS test checks if two data sets belong to the same statistical distribution, e.g. the same function and the same parameters. For example, mean or variance, but these parameters could be different for other distribution. In other words, the test detects that two data sets are different enough. This is a very intuitive explanation and it is too far from the theory.

> However, this test wasn't designed for time series, so it can produce wrong results here. I wanted to create a proof-of-concept
