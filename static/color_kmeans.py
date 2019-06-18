get_ipython().system(u'pip install PyPR')
get_ipython().magic(u'matplotlib inline')

# import the necessary packages
from sklearn.cluster import KMeans
from skimage import io
import matplotlib.pyplot as plt
import argparse
import cv2
import numpy as np
import cv2
import urllib
import pandas as pd

# construct the argument parser and parse the arguments
ap = argparse.ArgumentParser()
ap.add_argument("-s", "--slideid", required = True, help = "SlideId")
ap.add_argument("-n", "--name", required = True, help = "ImageName")
args = vars(ap.parse_args())

slide_id = args["slideid"];
path = "/media/raj/Raj1_5/kmeans/";
name = args["name"];
url = "<http://digitalslidearchive.emory.edu:8080/girder_root/api/v1/item/%s/download?contentDisposition=attachment>" % slide_id
urllib.urlretrieve(url, path+name)  

# load the image and convert it from BGR to RGB so that
image = path+name
image = cv2.imread(image)
image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

# reshape the image to be a list of pixels
image = image.reshape((image.shape[0] * image.shape[1], 3))

# cluster the pixel intensities
clt = KMeans(n_clusters = 3)
clt.fit(image)

# build a histogram of clusters and then create a figure
# representing the number of pixels labeled to each color
numLabels = np.arange(0, len(np.unique(clt.labels_)) + 1)
(hist, _) = np.histogram(clt.labels_, bins = numLabels)
# normalize the histogram, such that it sums to one
hist = hist.astype("float")
hist /= hist.sum()


# of each of the colors
bar = np.zeros((50, 300, 3), dtype = "uint8")
startX = 0
# loop over the percentage of each cluster and the color of
# each cluster
for (percent, color) in zip(hist, clt.cluster_centers_):
	# plot the relative percentage of each cluster
	endX = startX + (percent * 300)
	cv2.rectangle(bar, (int(startX), 0), (int(endX), 50), color.astype("uint8").tolist(), -1)
	startX = endX	
hist = centroid_histogram(clt)

# show our color bar
plt.figure()
plt.axis("off")
plt.imshow(bar)
plt.show()

#kmeans - Clustered image
cluster1=image[kmeans.labels_==0, :]
cluster2=image[kmeans.labels_==1, :]
cluster3=image[kmeans.labels_==2, :]

fig, ax = plt.subplots(ncols=3, figsize=(15,3))

ax[0].hist(cluster1[:,0], histtype="step", color='r')
ax[0].hist(cluster1[:,1], histtype="step", color='g')
ax[0].hist(cluster1[:,2], histtype="step", color='b')
ax[0].set_title("cluster1", fontsize=15)

ax[1].hist(cluster2[:,0], histtype="step", color='r')
ax[1].hist(cluster2[:,1], histtype="step", color='g')
ax[1].hist(cluster2[:,2], histtype="step", color='b')
ax[1].set_title("cluster2", fontsize=15)

ax[2].hist(cluster3[:,0], histtype="step", color='r')
ax[2].hist(cluster3[:,1], histtype="step", color='g')
ax[2].hist(cluster3[:,2], histtype="step", color='b')
ax[2].set_title("cluster3", fontsize=15)
plt.show()

#HeatMap for each cluster
fig, ax = plt.subplots(ncols=3, figsize=(15,3))
ax[0].scatter(cluster1[:,0], cluster1[:,1], color='magenta', marker="*")
ax[0].scatter(cluster2[:,0], cluster2[:,1], color='cyan', marker=".")
ax[0].scatter(cluster3[:,0], cluster3[:,1], color='orange', marker="^")
ax[0].set_xlabel("RED")
ax[0].set_ylabel("GREEN")

ax[1].scatter(cluster1[:,0], cluster1[:,2], color='magenta', marker="*")
ax[1].scatter(cluster2[:,0], cluster2[:,2], color='cyan', marker=".")
ax[1].scatter(cluster3[:,0], cluster3[:,2], color='orange', marker="^")
ax[1].set_xlabel("RED")
ax[1].set_ylabel("Blue")

ax[2].scatter(cluster1[:,1], cluster1[:,2], color='magenta', marker="*")
ax[2].scatter(cluster2[:,1], cluster2[:,2], color='cyan', marker=".")
ax[2].scatter(cluster3[:,1], cluster3[:,2], color='orange', marker="^")
ax[2].set_xlabel("Green")
ax[2].set_ylabel("Blue")
plt.show()

# plotting in 3d
from mpl_toolkits.mplot3d import axes3d, Axes3D 
fig = plt.figure()
ax = Axes3D(fig) 
red_data = cluster1[:,0]
green_data = cluster1[:,1]
blue_data = cluster1[:,2]
ax.set_xlabel('Red')
ax.set_ylabel('Green')
ax.set_zlabel('Blue')
#ax.plot_surface(xdata, ydata, zdata, rstride=1, cstride=1,cmap='viridis', edgecolor='none')
ax.scatter3D(red_data, blue_data, blue_data);
plt.show()
